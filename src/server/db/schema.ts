import { pgTable} from "drizzle-orm/pg-core";

import * as t from "drizzle-orm/pg-core";

export const driver = pgTable('driver', {
  id: t.uuid().primaryKey().notNull(),
  name: t.text().notNull(),
  nationality: t.varchar({ length: 2 }).notNull(),
  dob: t.text().notNull()
})
