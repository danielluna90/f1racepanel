import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const dotenvFile = path.join(
  path.dirname(require.resolve('f1racepanel-common/package.json')),
  '.env'
);

const dotenvTempFile = path.join(
  path.dirname(require.resolve('f1racepanel-common/package.json')),
  'old.env.temp'
);

const dotenvTestFile = path.join(
  path.dirname(require.resolve('f1racepanel-common/package.json')),
  '.env.test'
);

if (fs.existsSync(dotenvFile)) {
  fs.renameSync(dotenvFile, dotenvTempFile);
}

fs.copyFileSync(dotenvTestFile, dotenvFile);

console.log('Dotenv hack completed');

dotenv.config({ path: dotenvFile });

export const moveDotEnvBack = () => {
  fs.rmSync(dotenvFile);
  if (fs.existsSync(dotenvTempFile)) {
    fs.renameSync(dotenvTempFile, dotenvFile);
  }
};
