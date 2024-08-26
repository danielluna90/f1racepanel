import './load-prisma';
import * as dotenvHack from './dotenv-hack';
import { connection, initializeWebServer } from 'lib/createServer';
import { seedDB, startDB, stopDB } from './seed-db';
import type { GlobalSetupContext } from 'vitest/node';

export async function setup({ provide }: GlobalSetupContext) {
  await startDB();
  await seedDB();
  const port = await initializeWebServer();

  provide('port', port);
}

declare module 'vitest' {
  export interface ProvidedContext {
    port: number;
  }
}

export async function teardown() {
  connection.close(() => {
    console.log('Closing down server.');
  });

  dotenvHack.moveDotEnvBack();

  await stopDB();
}
