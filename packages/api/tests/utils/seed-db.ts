import { v2 as compose } from 'docker-compose';
import path from 'node:path';

const dockerServices = ['db-test'];
const dockerOptions = {
  cwd: path.join(
    path.dirname(require.resolve('f1racepanel-common/package.json')),
    'docker'
  ),
  log: true,
};

async function startDB() {
  await compose.downMany(dockerServices, dockerOptions);

  await compose.upMany(dockerServices, dockerOptions);

  process.env.DATABASE_URL =
    'postgresql://test:test@localhost:5432/f1racepanel?schema=public';

  const proc = Bun.spawnSync({
    cmd: ['bunx', 'prisma', 'db', 'push'],
    cwd: path.dirname(require.resolve('f1racepanel-common/package.json')),
    env: process.env,
  });

  const text = await new Response(proc.stdout).text();
  console.log(text);
}

async function stopDB() {
  await compose.stopMany(dockerOptions, ...dockerServices);
}

function seedDB() {
  console.log(process.env.DATABASE_URL);
}

export { startDB, stopDB, seedDB };