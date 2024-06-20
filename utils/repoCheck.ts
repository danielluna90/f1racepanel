import { checkENVFileExists } from "../packages/common/index"

import { z } from "zod";

import Path from "node:path";

const apiENVSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  IS_DEV_OR_TEST: z.string(),
});

async function main() {
  console.log("Checking Configuration");
  if (!await checkENVFileExists(apiENVSchema, Path.join(process.cwd(), "packages", "api"))) {
    process.exit(-1);
  }
  console.log("Repository is set");
}

await main();
