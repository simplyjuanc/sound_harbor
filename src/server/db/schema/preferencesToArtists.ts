import { createTable } from "../createTable";
import { integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { artists } from "./artists";
import { userPreferences } from "./userPreferences";



export const preferencesToArtists = createTable(
  'preferences_to_artists',
  {
    preferenceId: integer('preference_id')
      .notNull()
      .references(() => userPreferences.id),
    artistId: integer('artist_id')
      .notNull()
      .references(() => artists.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.preferenceId, t.artistId] }),
  })
);



export const userPreferencesToArtistRelations = relations(preferencesToArtists, ({ one }) => ({
  preference: one(userPreferences, {
    fields: [preferencesToArtists.preferenceId],
    references: [userPreferences.id],
  }),
  user: one(artists, {
    fields: [preferencesToArtists.artistId],
    references: [artists.id],
  }),
}));
