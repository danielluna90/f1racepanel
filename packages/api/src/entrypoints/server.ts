import { connection, initializeWebServer } from '..';
import { v2 as compose } from 'docker-compose';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;
const isDev = process.env.IS_DEV_OR_TEST?.toLowerCase() == 'true';
const dockerServices = ['db', 'pgadmin'];

if (isDev) {
  await compose.upMany(dockerServices, {
    cwd: path.join(
      path.dirname(require.resolve('f1racepanel-common/package.json')),
      'docker'
    ),
    log: true,
  });

  Bun.spawnSync({
    cmd: ['bunx', 'prisma', 'db', 'push'],
    cwd: path.dirname(require.resolve('f1racepanel-common/package.json')),
  });
}

initializeWebServer(port);

if (isDev) {
  async function closeDockerContainers() {
    console.log('Closing Docker Containers');
    await compose.stopMany(
      {
        cwd: path.join(
          path.dirname(require.resolve('f1racepanel-common/package.json')),
          'docker'
        ),
        log: true,
      },
      ...dockerServices
    );
  }

  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTRAP', 'SIGKILL'];

  exitSignals.forEach((signal: NodeJS.Signals) => {
    process.on(signal, () => {
      connection.close(() => {
        console.log('Server Closed');
      });
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
