import { date, integer, pgEnum, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../../utils/createTable";
import { relations } from "drizzle-orm/relations";
import { masters } from "./masters";
import { releasesToFormats } from "./releasesToFormats";
import { items } from "./items";
import { externalIdentifiers } from "./externalIdentifiers";



export const DatePrecisionEnum = pgEnum('release_date_precision', ['year', 'month', 'day']);

export const releases = createTable('releases', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  releaseDate: date('release_date'),
  releaseDatePrecision: DatePrecisionEnum('release_date_precision'),
  masterId: integer('master_id').notNull(),
  total_tracks: integer('total_tracks').notNull(),
  total_duration: integer('total_duration').notNull(),
  externalIdentifiers: serial('external_identifiers').references(() => externalIdentifiers.id)
});



export const releasesRelations = relations(releases, ({ one, many }) => ({
  master: one(masters, {
    fields: [releases.masterId],
    references: [masters.id],
  }),
  items: many(items),
  formats: many(releasesToFormats),

  // releasesToExternalIds: one(externalIds, {
  //   fields: [releases.id],
  //   references: [externalIds.id],
  // }),
}));



