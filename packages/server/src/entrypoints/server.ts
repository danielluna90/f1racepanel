import * as DockerUtils from 'entrypoints/docker/utils';
import { ServerMessages } from 'types';
import dotenv from 'dotenv';
import { initializeWebServer } from 'lib/createServer';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;
const isProdBuild = process.env.BUILD_PROD == 'TRUE';

if (isProdBuild) {
  process.on('message', async message => {
    if (message == ServerMessages.SERVER_INIT) {
      await DockerUtils.InitializeDocker();
    } else if (message == ServerMessages.SERVER_CLOSE) {
      await DockerUtils.CloseDocker();

      if (process.send) process.send(ServerMessages.SERVER_CLOSED);
    }
  });
} else {
  await DockerUtils.InitializeDocker();
}

await initializeWebServer(port);

if (process.send) process.send(ServerMessages.SERVER_READY);

if (!isProdBuild) {
  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTRAP', 'SIGKILL'];

  exitSignals.forEach((signal: NodeJS.Signals) => {
    process.on(signal, async () => {
      await DockerUtils.CloseDocker();
      process.exit(0);
    });
  });

  process.on('exit', () => {
    console.log('Program Exited Successfully');
  });
}
