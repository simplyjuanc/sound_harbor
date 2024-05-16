import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../../utils/createTable";
import { masters } from "./masters";
import { relations } from "drizzle-orm/relations";
import { preferencesToTracks } from "./userPreferencesToTracks";
import { externalIdentifiers } from "./externalIdentifiers";
import { artistsToTracks } from "./artistsToTracks";

export const tracks = createTable('tracks', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  duration: integer('duration').notNull(),
  trackNumber: integer('track_number'),
  discNumber: integer('disc_number'),
  albumId: integer('album_id').references(() => masters.id),
  externalIdentifiers: serial('external_identifiers').references(() => externalIdentifiers.id)
});

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  tracksToMasters: many(masters),
  artistsToTracks: many(artistsToTracks), // TODO change to many-to-many
  tracksToUserPreferences: one(preferencesToTracks, { // TODO change to many-to-many
    fields: [tracks.id],
    references: [preferencesToTracks.trackId],
  }),
}));
