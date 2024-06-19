import { file } from "bun";
import { z } from "zod";

import dotenv from 'dotenv';
dotenv.config();

const envVarsType = z.object({
  DATABASE_URL: z.string()
});

export function checkENVFileExists() {
  const envFile = file("./.env");

  if (!envFile.exists()) {
    console.log("Error! File '.env' does not exist. You can copy the '.env.schema' to get started.")
    process.exit(-1);
  }

  const envVars = envVarsType.passthrough().safeParse(process.env);

  if (!envVars.success) {
    console.log("Some keys are missing in '.env' file. Consult '.env.schema' file or envVarsType in 'src/postinstall.ts'");
    process.exit(-1);
  }
}

checkENVFileExists();
