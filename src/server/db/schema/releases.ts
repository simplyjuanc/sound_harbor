import { date, integer, pgEnum, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../createTable";
// import { datePrecision } from "./masters";
import { artists } from "./artists";



export const datePrecision = pgEnum('release_date_precision', ['year', 'month', 'day']);

export const releases = createTable('releases', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  releaseDate: date('release_date'),
  releaseDatePrecision: datePrecision('release_date_precision'),
  total_tracks: integer('total_tracks').notNull(),
  total_duration: integer('total_duration').notNull(),
});



// const releasesRelations = relations(releases, ({ many }) => ({
//   artists: many(artists),
// }))