import { checkENVFileExists } from '../packages/common/index';

import { z } from 'zod';

import fs from 'node:fs';
import Path from 'node:path';

const apiENVSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  IS_DEV_OR_TEST: z.string(),
});

function main() {
  console.log('Checking Configuration');

  const APIPackagePath = Path.join(process.cwd(), 'packages', 'api');
  const CommonPackagePath = Path.join(process.cwd(), 'packages', 'common');

  if (!checkENVFileExists(apiENVSchema, APIPackagePath)) {
    process.exit(-1);
  }

  const UnifiedAPIYmlFile = Path.join(APIPackagePath, 'src', 'static', 'api', 'f1racepanel-v1.yml');
  if (!fs.existsSync(UnifiedAPIYmlFile)) {
    console.log('Unified API Spec does not exist, generating...');
    Bun.spawnSync({
      cmd: ['bun', '--filter', 'f1racepanel-common', 'api:gen']
    });
    fs.renameSync(Path.join(CommonPackagePath, 'f1racepanel-v1.yml'), UnifiedAPIYmlFile);
    console.log('Unified API Spec was successfully created');
  }


  console.log('Repository is set');
}

main();
