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
