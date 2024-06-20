import { file, write } from "bun";
import { z } from "zod";
import Path from "node:path";
import fs from "node:fs";

import dotenv from 'dotenv';

export async function checkENVFileExists(schema: z.AnyZodObject, path: string): Promise<boolean> {
  const envFilePath = Path.join(path, ".env");

  let envFile = file(envFilePath);
  const devENVFile = file(Path.join(path, ".env.dev"));

  if (!await envFile.exists()) {
    if (await devENVFile.exists()) {
      console.warn("Didn't find '.env', but found '.env.test' so using that instead");

      fs.writeFileSync(envFilePath, await devENVFile.text(), { flag: 'a+' });

      // TODO: It seems that Bun requires me to reload file in order to observe changes. Should revisit at a later time
      envFile = file(envFilePath);

      console.log("Wrote '.env.test' to '.env'")
    } else {
      console.log(`Error! File '.env' does not exist at ${envFile.toString()}. You can copy the '.env.schema' to get started.`)

      return false;
    }
  }

  const parsedENV = dotenv.parse(await envFile.text());

  const envVars = schema.passthrough().safeParse(parsedENV);
  if (!envVars.success) {
    console.log("Some keys are missing in '.env' file. Consult the documentation for more information");

    return false;
  }

  return true;
}
