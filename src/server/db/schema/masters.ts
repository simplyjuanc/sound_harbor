import { date, integer, pgEnum, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../../utils/createTable";
// import { datePrecision } from "./masters";
import { releases } from "./releases";
import { relations } from "drizzle-orm/relations";
import { tracks } from "./tracks";
import { artistsToMasters } from "./artistsToMasters";


export const datePrecision = pgEnum('release_date_precision', ['year', 'month', 'day']);

export const masters = createTable('masters', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  releaseDate: date('release_date'),
  releaseDatePrecision: datePrecision('release_date_precision'),
  total_tracks: integer('total_tracks').notNull(),
  total_duration: integer('total_duration').notNull(),
  mainReleaseId: integer('main_release_id').references(() => releases.id),
});



export const mastersRelations = relations(masters, ({ one, many }) => ({
  mainRelease: one(releases, {
    fields: [masters.mainReleaseId],
    references: [releases.id],
  }),
  releases: many(releases),
  tracklist: many(tracks),
  artists: one(artistsToMasters, {
    fields: [masters.id],
    references: [artistsToMasters.masterId],
  })
}));
