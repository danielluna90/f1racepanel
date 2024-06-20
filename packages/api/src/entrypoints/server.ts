import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;

const isDev = process.env.IS_DEV_OR_TEST?.toLowerCase() == 'true';

import { v2 as compose } from 'docker-compose';
import path from 'node:path';

if (isDev) {
  await compose.upMany(['db', 'pgadmin'], {
    cwd: path.join(
      path.dirname(require.resolve('f1racepanel-common/package.json')),
      'docker'
    ),
    log: true,
  });
}

import { initializeWebServer } from '../index';

initializeWebServer(port);
