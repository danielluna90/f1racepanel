import { spawn, spawnSync, SpawnSyncReturns } from 'node:child_process';
import path from 'node:path';
import { ServerMessages } from 'f1racepanel-server/src/types/server';

import dotenv from 'dotenv';

// Global Const
const CLIENT_DIRECTORY = path.dirname(require.resolve('f1racepanel-client/package.json'));
const SERVER_DIRECTORY = path.dirname(require.resolve('f1racepanel-server/package.json'));

if (!process.env.CI && process.env.USE_DOTENV) {
  console.log('Using .env file!');
  dotenv.config();
}

// Check ENV Variables
if (!process.env.DATABASE_URL) {
  console.log('Environment Variable DATABASE_URL is not defined');
  process.exit(-1);
}

if (process.env.CI) {
  if (!process.env.DATA_API_KEY) {
    console.log('Set DATA_API_KEY');
    process.exit(-1);
  }

  console.log('Environment Variable CI is set, building using local docker PostgreSQL and fetching latest DB');
} else {
  console.log('Local dev configuration detected.');
  process.env.BUILD_LOCAL_PROD = 'TRUE';

  if (!process.env.DB_DOWNLOAD || !process.env.DATA_API_KEY) {
    console.log('Not Downloading Latest DB. To enable set the environment variable DB_DOWNLOAD and DATA_API_KEY.');
  } else {
    console.log('Going to Download Latest DB');

    spawnSync('bun', ['src/entrypoints/db_download.ts'], {
      cwd: SERVER_DIRECTORY,
      stdio: 'inherit'
    });
  }
}

// Generate Prisma & Zod Types
spawnSync('bun', ['run', 'db:gen'], {
  cwd: SERVER_DIRECTORY,
  env: process.env
});

// Run Server
console.log('Starting Server Up on Port 3000')

let client: SpawnSyncReturns<Buffer> | undefined;

const server = spawn('bun', ['src/entrypoints/server.ts'], {
  cwd: SERVER_DIRECTORY,
  env: process.env,
  stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ],
  killSignal: 'SIGINT',
}).on('message', (message)=> {
  if (message == ServerMessages.SERVER_READY) {
    console.log(`Server is ready!`);
    startClient();
  } else if (message == ServerMessages.SERVER_CLOSED) {
    console.log("Server Closed!");
    server.kill();
  
    console.log("Exiting Build Script");
    process.exit(client?.status);
  }
});
server.send(ServerMessages.SERVER_INIT);

function startClient(): SpawnSyncReturns<Buffer> {
  client = spawnSync('bun', ['run', 'build'], {
    cwd: CLIENT_DIRECTORY,
    env: process.env,
    stdio: 'inherit'
  });
  
  server.send(ServerMessages.SERVER_CLOSE);
  
  return client;
}
