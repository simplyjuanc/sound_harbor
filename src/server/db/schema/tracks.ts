import { date, integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../createTable";
import { masters } from "./masters";

export const tracks = createTable('tracks', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  duration: integer('duration').notNull(),
  trackNumber: integer('track_number'),
  discNumber: integer('disc_number'),
  albumId: integer('album_id').references(() => masters.id),
});

