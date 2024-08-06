import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';

// Check ENV Variables
if (!process.env.DATABASE_URL) {
  console.log("Environment Variable DATABASE_URL is not defined");
  process.exit(-1);
}

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
const server = spawn('bun', ['src/entrypoints/server.ts'], {
  cwd: SERVER_DIRECTORY,
  env: process.env,
  killSignal: 'SIGINT',
});

let serverIsActive: boolean = false;
const serverHealthCheck = setInterval(async ()=>{
  fetch('http://localhost:3000/').catch((_)=>{
    console.log("Failed to Connect to Server... Trying again in 1 second...");
  }).then((_)=>{
    serverIsActive = true;
    clearInterval(serverHealthCheck);
  })
}, 1000);

if (serverIsActive) {
  console.log("Server is Up, Starting Build Process");
}

const client = spawnSync('bun', ['run', 'build'], {
  cwd: CLIENT_DIRECTORY,
  env: process.env,
  stdio: 'inherit'
});

server.kill();

console.log("Exiting Build Script");
process.exit(client.status);
