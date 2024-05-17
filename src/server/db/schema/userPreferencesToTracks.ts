import { integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "../../utils/createTable";
import { tracks } from "./tracks";
import { userPreferences } from "./userPreferences";
import { relations } from "drizzle-orm/relations";




export const userPreferencesToTracks = createTable(
  'user_preferences_to_tracks',
  {
    preferenceId: integer('preference_id')
      .notNull()
      .references(() => userPreferences.id),
    trackId: integer('track_id')
      .notNull()
      .references(() => tracks.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  },
  (t) => ({ pk: primaryKey({ columns: [t.preferenceId, t.trackId] }) })
);


export const userPreferencesToTracksRelations = relations(userPreferencesToTracks, ({ one }) => ({
  preference: one(userPreferences, {
    fields: [userPreferencesToTracks.preferenceId],
    references: [userPreferences.id],
  }),
  tracks: one(tracks, {
    fields: [userPreferencesToTracks.trackId],
    references: [tracks.id],
  })
}));