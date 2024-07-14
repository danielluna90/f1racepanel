import { checkENVFileExists } from 'f1racepanel-common';
import { APIPackagePath, CommonPackagePath, moveAPIDocsToAPIServer, printDevMsg } from './utils';
import { z } from 'zod';

import fs from 'node:fs';
import path from 'node:path';

const apiENVSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  IS_DEV_OR_TEST: z.string(),
});

function setupDevENVFiles() {
  if (!checkENVFileExists(apiENVSchema, APIPackagePath)) {
    process.exit(-1);
  }

  if (!fs.existsSync(path.join(CommonPackagePath, '.env'))) {
    printDevMsg('Didn\'t find \'.env\' so copying .env from API Package');
    fs.copyFileSync(path.join(APIPackagePath, '.env'), path.join(CommonPackagePath, '.env'));
  }
}

function main() {
  printDevMsg('Configuring Development Environment');
  
  printDevMsg('Running gen:* Scripts in f1racepanel-common');
  Bun.spawnSync({
    cmd: ['bun', '--filter', 'f1racepanel-common', 'postinstall']
  });

  printDevMsg('Checking .env Status');
  setupDevENVFiles();

  printDevMsg('Checking f1racepanel-v1.yml Status');
  moveAPIDocsToAPIServer();

  printDevMsg('Repository Set for Development');
}

main();
