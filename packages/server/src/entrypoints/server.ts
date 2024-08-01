import { Documentation, createServer } from 'express-zod-api';

import { config } from 'lib/config';
import { routing } from 'lib/routing';

import { writeFileSync } from 'fs';

writeFileSync(
  'src/static/api/f1racepanel-v1.yml',
  new Documentation({
    routing,
    config,
    version: 'v1',
    title: 'F1 Race Panel API',
    serverUrl: 'https://api.f1racepanel.com/v1',
  }).getSpecAsYaml(),
  'utf-8'
);

await createServer(config, routing);
