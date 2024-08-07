import { v2 as compose } from 'docker-compose';
import path from 'node:path';

const dockerServices = ['db', 'pgadmin'];

export async function InitializeDocker() {
  await compose.upMany(dockerServices, {
    cwd: path.join(
      path.dirname(require.resolve('f1racepanel-server/package.json')),
      'docker',
      'dev'
    ),
    log: true,
  });

  Bun.spawnSync({
    cmd: ['bunx', 'prisma', 'db', 'push'],
    cwd: path.dirname(require.resolve('f1racepanel-server/package.json')),
    env: process.env,
  });
}

export async function CloseDocker() {
  console.log('Closing Docker Containers');
  await compose.stopMany(
    {
      cwd: path.join(
        path.dirname(require.resolve('f1racepanel-server/package.json')),
        'docker',
        'dev'
      ),
      log: true,
    },
    ...dockerServices
  );
  console.log('Docker Containers Closed');
}
