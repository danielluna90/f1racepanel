import { GenerateMockOptions, generateMock } from '@anatine/zod-mock';
import { ResponseTypes, PrismaClient } from 'f1racepanel-common';
import { v2 as compose } from 'docker-compose';
import { faker } from '@faker-js/faker';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const dockerServices = ['db-test'];
const dockerOptions: compose.IDockerComposeOptions = {
  cwd: path.join(
    path.dirname(require.resolve('f1racepanel-common/package.json')),
    'docker-test-suite'
  ),
  log: true,
};

async function startDB() {
  await compose.downMany(dockerServices, {
    commandOptions: ['-v'],
    ...dockerOptions,
  });

  await compose.upMany(dockerServices, dockerOptions);

  process.env.DATABASE_URL =
    'postgresql://test:test@localhost:5432/f1racepanel?schema=public';

  // const proc = Bun.spawnSync({
  //   cmd: ['bunx', 'prisma', 'db', 'push'],
  //   cwd: path.dirname(require.resolve('f1racepanel-common/package.json')),
  //   env: process.env,
  // });

  const genPrismaTypesProc = spawnSync('bun', ['run', 'gen:prisma'], {
    cwd: path.dirname(require.resolve('f1racepanel-common/package.json')),
    env: process.env,
  });

  const genPrismaOutput = await new Response(genPrismaTypesProc.stdout).text();
  console.log(genPrismaOutput);

  const pushPrismaToDBProc = spawnSync('bunx', ['prisma', 'db', 'push'], {
    cwd: path.dirname(require.resolve('f1racepanel-common/package.json')),
    env: process.env,
  });

  const pushPrismaOutput = await new Response(pushPrismaToDBProc.stdout).text();
  console.log(pushPrismaOutput);
}

async function stopDB() {
  await compose.stopMany(dockerOptions, ...dockerServices);
}

async function seedDB() {
  const prisma = new PrismaClient();

  // Add two drivers
  const driver = ResponseTypes.Driver;
  const driverStringMap: GenerateMockOptions = {
    stringMap: {
      dob: () => faker.date.past({ years: 100 }).toISOString().split('T')[0],
    },
  };

  await prisma.driver.createMany({
    data: [
      generateMock(driver, driverStringMap),
      generateMock(driver, driverStringMap),
    ],
  });

  // Add two circuits
  // Add three GP Weekends
  // Add two Seasons
}

export { startDB, stopDB, seedDB };
