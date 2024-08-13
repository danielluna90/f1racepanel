import { z } from "zod";
import Path from "node:path";
import fs from "node:fs";

import dotenv from 'dotenv';

export function checkENVFileExists(schema: z.AnyZodObject, path: string): boolean {
  const envFilePath = Path.join(path, ".env");
  const devENVFilePath = Path.join(path, ".env.dev");

  if (!fs.existsSync(envFilePath)) {
    if (fs.existsSync(devENVFilePath)) {
      console.warn("Didn't find '.env', but found '.env.test' so using that instead");

      fs.writeFileSync(envFilePath, fs.readFileSync(devENVFilePath), { flag: 'a+' });

      console.log("Wrote '.env.test' to '.env'")
    } else {
      console.log(`Error! File '.env' does not exist at ${envFilePath}. You can copy the '.env.schema' to get started.`)

      return false;
    }
  }

  const parsedENV = dotenv.parse(fs.readFileSync(envFilePath));

  const envVars = schema.passthrough().safeParse(parsedENV);
  if (!envVars.success) {
    console.log("Some keys are missing in '.env' file. Consult the documentation for more information");

    return false;
  }

  return true;
}
