import { serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../../utils/createTable";
import {relations} from "drizzle-orm/relations";
import {artists} from "~/server/db/schema/artists";
import {items} from "~/server/db/schema/items";
import {masters} from "~/server/db/schema/masters";
import {releases} from "~/server/db/schema/releases";
import {tracks} from "~/server/db/schema/tracks";


export const externalIdentifiers = createTable('external_identifiers', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  discogs_url: varchar('discogs_url', { length: 256 }),
  spotify_url: varchar('spotify_url', { length: 256 }),
  isrc: varchar('isrc', { length: 256 }),
  ean: varchar('ean', { length: 256 }),
  upc: varchar('upc', { length: 256 }),
});


export const externalIdentifiersRelations = relations(externalIdentifiers, ({ one }) => ({
  artist: one(artists),
  items: one(items),
  masters: one(masters),
  releases: one(releases),
  tracks: one(tracks),

}));
