import { v2 as compose } from 'docker-compose';
import dotenv from 'dotenv';
import { initializeWebServer } from 'lib/createServer';
import path from 'node:path';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;
const isDev = process.env.IS_DEV_OR_TEST?.toLowerCase() == 'true';
const dockerServices = ['db', 'pgadmin'];

if (isDev) {
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

await initializeWebServer(port);

if (isDev) {
  async function closeDockerContainers() {
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
  }

  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTRAP', 'SIGKILL'];

  exitSignals.forEach((signal: NodeJS.Signals) => {
    process.on(signal, () => {
      closeDockerContainers()
        .finally(() => {
          console.log('Closed Docker Containers');
          process.exit(0);
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    });
  });

  process.on('exit', () => {
    console.log('Program Exited Successfully');
  });
}
