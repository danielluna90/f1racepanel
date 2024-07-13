import { Driver, PrismaClient } from 'f1racepanel-common';
import { v2 as compose } from 'docker-compose';
import { generateMock } from '@anatine/zod-mock';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

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

  // const proc = Bun.spawnSync({
  //   cmd: ['bunx', 'prisma', 'db', 'push'],
  //   cwd: path.dirname(require.resolve('f1racepanel-common/package.json')),
  //   env: process.env,
  // });

  const proc = spawnSync('bunx', ['prisma', 'db', 'push'], {
    cwd: path.dirname(require.resolve('f1racepanel-common/package.json')),
    env: process.env,
  });

  const text = await new Response(proc.stdout).text();
  console.log(text);
}

async function stopDB() {
  await compose.stopMany(dockerOptions, ...dockerServices);
}

async function seedDB() {
  const prisma = new PrismaClient();

  // Add two drivers
  const driverWithoutID = Driver.omit({ id: true });

  await prisma.driver.createMany({
    data: [generateMock(driverWithoutID), generateMock(driverWithoutID)],
  });

  // Add two circuits
  // Add three GP Weekends
  // Add two Seasons
}

export { startDB, stopDB, seedDB };
