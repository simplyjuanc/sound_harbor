import { createTable } from "../../utils/createTable";
import { integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { artists } from "./artists";
import { tracks } from "./tracks";



export const artistsToTracks = createTable(
  'artists_to_masters',
  {
    artistId: integer('artist_id')
      .notNull()
      .references(() => artists.id),
    trackId: integer('track_id')
      .notNull()
      .references(() => tracks.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.trackId, t.artistId] }),
  })
);



export const artistToTracksRelations = relations(artistsToTracks, ({ one }) => ({
  preference: one(tracks, {
    fields: [artistsToTracks.trackId],
    references: [tracks.id],
  }),
  user: one(artists, {
    fields: [artistsToTracks.artistId],
    references: [artists.id],
  }),
}));
