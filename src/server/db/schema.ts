import * as t from 'drizzle-orm/pg-core';

import { pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const driver = pgTable('driver', {
  id: t.uuid().primaryKey().notNull().defaultRandom(),
  name: t.text().notNull(),
  nationality: t.varchar({ length: 2 }).notNull(),
  dob: t.text().notNull(),
});

export const driverRelations = relations(driver, ({ many }) => ({
  sessionEntries: many(driverEntry),
  raceLapRecords: many(raceLapRecord),
}));

export const raceLapRecord = pgTable('race_lap_record', {
  id: t.uuid().primaryKey().notNull().defaultRandom(),
  time: t.time(),

  driverID: t.uuid().notNull(),
});

export const raceLapRecordRelations = relations(raceLapRecord, ({ one }) => ({
  driver: one(driver, {
    fields: [raceLapRecord.driverID],
    references: [driver.id],
  }),
}));

export const circuitLayout = pgTable('circuit_layout', {
  id: t.uuid().primaryKey().notNull().defaultRandom(),

  firstYear: t.integer().notNull(),
  lastYear: t.integer(),
  trackLength: t.numeric().notNull(),

  circuitID: t.uuid().notNull(),
  raceLapRecordID: t.uuid(),
});

export const circuitLayoutRelations = relations(circuitLayout, ({ one }) => ({
  circuit: one(circuit, {
    fields: [circuitLayout.circuitID],
    references: [circuit.id],
  }),
  raceLapRecord: one(raceLapRecord, {
    fields: [circuitLayout.raceLapRecordID],
    references: [raceLapRecord.id],
  }),
}));

export const circuit = pgTable('circuit', {
  id: t.uuid().primaryKey().notNull().defaultRandom(),

  name: t.text().notNull(),
  country: t.varchar({ length: 2 }).notNull(),
  dateOpened: t.date().notNull(),
});

export const circuitRelations = relations(circuit, ({ many }) => ({
  layouts: many(circuitLayout),
}));

export const sessionStatusEnum = t.pgEnum('session_status', [
  'UNKNOWN',
  'ACTIVE',
  'FUTURE',
  'COMPLETED',
  'CANCELED',
]);

// This was in oringal Prisma schema but was unused.
//
// export const result = pgTable('result', {
//   id: t.uuid().primaryKey().notNull().defaultRandom(),
//
//   driverID: t.uuid().notNull()
// })

export const weekendSession = pgTable('weekend_session', {
  id: t.uuid().primaryKey().notNull().defaultRandom(),

  sessionNumber: t.integer(),
  sessionStatus: sessionStatusEnum().default('FUTURE'),

  GPWeekendID: t.uuid().notNull(),
});

export const weekendSessionRelations = relations(
  weekendSession,
  ({ many }) => ({
    driverEntryToWeekendSession: many(driverEntryToWeekendSession),
    // GPWeekend: one(GPWeekend),
  })
);

// Drivers (pre-2013) car numbers were based on performance in the previous
// year's championship so drivers would change car number's throughout their carrers.
// Since this wouldn't often change throughout the same season, as a space saving measure,
// we will allow one driver entry to be associated with more than one GP Weekend.
export const driverEntry = pgTable('driver_entry', {
  id: t.uuid().primaryKey().notNull().defaultRandom(),

  driverID: t.uuid().notNull(),
  carNumber: t.integer().notNull(),
});

export const driverEntryRelations = relations(driverEntry, ({ one, many }) => ({
  driver: one(driver, {
    fields: [driverEntry.driverID],
    references: [driver.id],
  }),
  driverEntryToWeekendSession: many(driverEntryToWeekendSession),
}));

export const driverEntryToWeekendSession = pgTable(
  'driver_entry_to_weekend_session',
  {
    driverEntryID: t
      .uuid()
      .notNull()
      .references(() => driverEntry.id),
    weekendSessionID: t
      .uuid()
      .notNull()
      .references(() => weekendSession.id),
  },
  t => [primaryKey({ columns: [t.driverEntryID, t.weekendSessionID] })]
);

export const driverEntryToWeekendSessionRelations = relations(
  driverEntryToWeekendSession,
  ({ one }) => ({
    driverEntry: one(driverEntry, {
      fields: [driverEntryToWeekendSession.driverEntryID],
      references: [driverEntry.id],
    }),
    weekendSession: one(weekendSession, {
      fields: [driverEntryToWeekendSession.weekendSessionID],
      references: [weekendSession.id],
    }),
  })
);

export const weekendStatusEnum = t.pgEnum('weekend_status', [
  'UNKNOWN',
  'COMPLETED',
  'CURRENT',
  'FUTURE',
]);

export const weekend = pgTable(
  'weekend',
  {
    id: t.uuid().primaryKey().notNull().defaultRandom(),

    startDate: t.date().notNull().unique(),
    endDate: t.date().notNull().unique(),

    roundNumber: t.integer().notNull(),

    circuitID: t.uuid().notNull(),
    circuitLayoutID: t.uuid().notNull(),
    seasonID: t.integer().notNull(),

    status: weekendStatusEnum().default('FUTURE'),
  },
  table => [t.unique('season_round_unq').on(table.seasonID, table.roundNumber)]
);

export const weekendRelations = relations(weekend, ({ one }) => ({
  circuit: one(circuit, {
    fields: [weekend.circuitID],
    references: [circuit.id],
  }),
  circuitLayout: one(circuitLayout, {
    fields: [weekend.circuitLayoutID],
    references: [circuitLayout.id],
  }),
  season: one(season, {
    fields: [weekend.seasonID],
    references: [season.year],
  }),
}));

export const season = pgTable(
  'season',
  {
    year: t.integer().notNull().unique(),

    numberOfRounds: t.integer().notNull(),
    isCurrentSeason: t.boolean().notNull().default(false),
  },
  table => [t.check('year_check', sql`${table.year} > 0`)]
);

export const seasonConstraints = relations(season, ({ many }) => ({
  weekends: many(weekend),
}));

/* Old Prisma Schema
model Driver {
  id          String @id @default(uuid())
  name        String @unique
  nationality String @db.VarChar(2) /// @zod.string.length(2)
  dob         String /// @zod.custom.use(z.string().date())

  session_entries  DriverEntry[]
  gp_weekends      GPWeekend[]
  seasons          Season[]
  race_lap_records RaceLapRecord[]
}

model RaceLapRecord {
  id        String @id @default(uuid())
  time      String /// @zod.string.regex(new RegExp("^d{1}:d{2}.d{3}$"))
  driver    Driver @relation(fields: [driver_id], references: [id])
  driver_id String /// @zod.string.uuid()

  circuit_layout CircuitLayout?
}

model CircuitLayout {
  id                 String         @id @default(uuid())
  first_year         Int
  last_year          Int?
  track_length       Float
  race_lap_record    RaceLapRecord? @relation(fields: [race_lap_record_id], references: [id])
  race_lap_record_id String?        @unique /// @zod.string.uuid()
  circuit            Circuit        @relation(fields: [circuit_id], references: [id])
  circuit_id         String /// @zod.string.uuid()

  gp_weekends GPWeekend[] // @zod.object.array(.min(1))
}

model Circuit {
  id          String          @id @default(uuid())
  name        String
  country     String          @db.VarChar(2) /// @zod.string.length(2)
  date_opened String /// @zod.custom.use(z.string().date())
  layouts     CircuitLayout[] // @zod.object.array(.min(1))
  gp_weekends GPWeekend[] // @zod.object.array(.min(1))
}

enum SessionStatus {
  UNKNOWN
  ACTIVE
  FUTURE
  COMPLETED
  CANCELED
}

model Result {
  id String @id @default(uuid())

  driver_id String /// @zod.string.uuid()
}

model WeekendSession {
  id String @id @default(uuid())

  session_number Int
  session_status SessionStatus @default(FUTURE)

  driver_entries DriverEntry[]

  gp_weekend    GPWeekend @relation(fields: [gp_weekend_id], references: [id])
  gp_weekend_id String
}

enum WeekendStatus {
  UNKNOWN
  COMPLETED
  CURRENT
  FUTURE
}

model GPWeekend {
  id String @id @default(uuid())

  start_date String @unique /// @zod.custom.use(z.string().date())
  end_date   String @unique /// @zod.custom.use(z.string().date())

  round_number Int

  circuit    Circuit @relation(fields: [circuit_id], references: [id])
  circuit_id String /// @zod.string.uuid()

  circuit_layout    CircuitLayout? @relation(fields: [circuit_layout_id], references: [id])
  circuit_layout_id String? /// @zod.string.uuid()
  // sessions Sessions[] <- One-to-Many

  status WeekendStatus @default(FUTURE)

  sessions WeekendSession[] /// @zod.object.array(.min(1))

  season    Season   @relation(fields: [season_id], references: [year])
  season_id Int
  // team_entries Team[] <- Many-to-Many
  Driver    Driver[]

  @@unique([season_id, round_number])
}

// Drivers (pre-2013) car numbers were based on performance in the previous
// year's championship so drivers would change car number's throughout their carrers.
// Since this wouldn't often change throughout the same season, as a space saving measure,
// we will allow one driver entry to be associated with more than one GP Weekend.
model DriverEntry {
  id String @id @default(uuid())

  driver     Driver @relation(fields: [driver_id], references: [id])
  driver_id  String
  car_number Int

  weekend_session WeekendSession[]
}

model Season {
  year Int @id @unique

  drivers           Driver[]
  num_of_rounds     Int
  is_current_season Boolean /// @zod.custom.use(z.boolean().default(false))

  weekends GPWeekend[]
  // point_system
}
*/
