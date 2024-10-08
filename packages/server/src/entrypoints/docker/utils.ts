import { createWriteStream, existsSync, mkdirSync, openSync } from 'node:fs';
import { Readable } from 'node:stream';
import { v2 as compose } from 'docker-compose';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const dockerServices = ['db', 'pgadmin'];

const isCI = process.env.CI;

const serverPath = path.dirname(
  require.resolve('f1racepanel-server/package.json')
);

export async function InitializeDocker() {
  await compose.upMany(dockerServices, {
    cwd: path.join(serverPath, 'docker', 'dev'),
    log: true,
  });

  if (isCI) {
    await GetLatestDatabaseFile();
  }

  spawnSync('bun', ['run', 'db:push'], {
    cwd: serverPath,
    env: process.env,
    stdio: 'inherit',
  });
}

export async function CloseDocker() {
  console.log('Closing Docker Containers');
  await compose.stopMany(
    {
      cwd: path.join(serverPath, 'docker', 'dev'),
      log: true,
    },
    ...dockerServices
  );
  console.log('Docker Containers Closed');
}

export async function GetLatestDatabaseFile() {
  console.log('Downloading Latest Database from AWS');

  if (!process.env.DATA_API_KEY) {
    console.log('ERROR: DATA_API_KEY not set');
    process.exit(-1);
  }

  const data = await fetch('https://data.f1racepanel.com/latest', {
    headers: {
      'x-f1racepanel-auth': process.env.DATA_API_KEY,
    },
  });

  if (!data.ok) {
    console.log('ERROR: COULD NOT GET DATABASE DATA!');
    process.exit(-1);
  }

  const json = (await data.json()) as {
    url: string;
  };

  const dbURL = json.url;

  const database = await fetch(dbURL);

  if (database.ok && database.body) {
    const folderPath = path.join(serverPath, 'docker', 'dev', 'database');

    const filePath = path.join(folderPath, 'latest.db');

    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }

    if (!existsSync(filePath)) {
      openSync(filePath, 'w');
    }

    const writer = createWriteStream(filePath);

    Readable.fromWeb(database.body).pipe(writer);
  }

  console.log('Downloaded Latest Database, pushing to PostgreSQL.');

  await compose.exec(
    'db',
    'pg_restore /home/database/latest.db -d f1racepanel -c --if-exists',
    {
      cwd: path.join(serverPath, 'docker', 'dev'),
      log: true,
    }
  );
}
