import { createTable } from "../../utils/createTable";
import { integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { artists } from "./artists";
import { masters } from "./masters";



export const artistsToMasters = createTable(
  'artists_to_masters',
  {
    artistId: integer('artist_id')
      .notNull()
      .references(() => artists.id),
    masterId: integer('master_id')
      .notNull()
      .references(() => masters.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.masterId, t.artistId] }),
  })
);



export const artistToMastersRelations = relations(artistsToMasters, ({ one }) => ({
  preference: one(masters, {
    fields: [artistsToMasters.masterId],
    references: [masters.id],
  }),
  user: one(artists, {
    fields: [artistsToMasters.artistId],
    references: [artists.id],
  }),
}));
