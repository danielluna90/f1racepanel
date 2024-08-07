import { spawn, spawnSync, SpawnSyncReturns } from 'node:child_process';
import path from 'node:path';
import { ServerMessages } from 'f1racepanel-server';

// Check ENV Variables
if (!process.env.DATABASE_URL) {
  console.log('Environment Variable DATABASE_URL is not defined');
  process.exit(-1);
}

process.env.BUILD_PROD = 'TRUE';

// Global Const
const CLIENT_DIRECTORY = path.dirname(require.resolve('f1racepanel-client/package.json'));
const SERVER_DIRECTORY = path.dirname(require.resolve('f1racepanel-server/package.json'));

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
  stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ],
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

function startClient(): SpawnSyncReturns<Buffer> {
  client = spawnSync('bun', ['run', 'build'], {
    cwd: CLIENT_DIRECTORY,
    env: process.env,
    stdio: 'inherit'
  });
  
  server.send(ServerMessages.SERVER_CLOSE);
  
  return client;
}
