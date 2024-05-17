import { createTable } from "../../utils/createTable";
import { integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { artists } from "./artists";
import { userPreferences } from "./userPreferences";



export const userPreferencesToArtists = createTable(
  'user_preferences_to_artists',
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



export const preferencesToArtistRelations = relations(userPreferencesToArtists, ({ one }) => ({
  preference: one(userPreferences, {
    fields: [userPreferencesToArtists.preferenceId],
    references: [userPreferences.id],
  }),
  user: one(artists, {
    fields: [userPreferencesToArtists.artistId],
    references: [artists.id],
  }),
}));
