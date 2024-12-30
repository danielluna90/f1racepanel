import { exit } from 'node:process';
import fs from 'node:fs';

function printError(step: number, msg: string): never {
  console.log('The F1 Race Panel build script has encountered an error!');
  console.log(`Error During Step ${step.toString()}`);
  console.log(`  MSG: ${msg}`);

  exit(-1);
}

function main(): void {
  // Step 1: Check ENV
  if (!fs.existsSync('.env')) {
    printError(1, '.env file is not set!');
  }

  // Step 2: Create Postgresql Docker Instance

  // Step 3: Download Data from AWS
  // Step 4: Run Build Script
  // Step 5: Confirmation
  console.log('Build complete!');
}

main();
