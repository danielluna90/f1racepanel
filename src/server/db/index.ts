import 'dotenv/config';

import * as schema from './schema';

import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle({
  connection: `postgresql://${process.env.POSTGRES_USER ?? ''}:${process.env.POSTGRES_PASSWORD ?? ''}@${process.env.POSTGRES_HOST ?? ''}/${process.env.POSTGRES_DB ?? ''}`,
  casing: 'snake_case',
  schema: schema,
});
