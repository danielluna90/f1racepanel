import 'dotenv/config';

import * as schema from './schema';

import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle({
  connection: process.env.DATABASE_URL ?? '',
  casing: 'snake_case',
  schema: schema,
});
