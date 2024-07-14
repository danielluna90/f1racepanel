import fs from 'node:fs';
import path from 'node:path';

export const APIPackagePath = path.join(process.cwd(), 'packages', 'api');
export const CommonPackagePath = path.join(process.cwd(), 'packages', 'common');

export function printDevMsg(msg: String, prod: boolean = false, indent: boolean = false) {
  if (!indent) {
    console.log(`[F1 Race Panel](${prod ? 'prod' : 'dev'}):`, msg);
  } else {
    console.log(`  ${msg}`);
  }
}

export function moveAPIDocsToAPIServer() {
  const UnifiedAPIYmlFile = path.join(APIPackagePath, 'src', 'static', 'api', 'f1racepanel-v1.yml');
  if (!fs.existsSync(UnifiedAPIYmlFile)) {
    console.log('Unified API Spec does not exist, generating...');
    Bun.spawnSync({
      cmd: ['bun', '--filter', 'f1racepanel-common', 'gen:api']
    });
    fs.renameSync(path.join(CommonPackagePath, 'f1racepanel-v1.yml'), UnifiedAPIYmlFile);
    console.log('Unified API Spec was successfully created');
  }
}
