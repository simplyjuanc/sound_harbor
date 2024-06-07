import {relations} from "drizzle-orm/relations";
import {artists} from "~/server/db/tables/artists";
import {items} from "~/server/db/tables/items";
import {createTable} from "~/server/utils/createTable";
import {serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {masters} from "~/server/db/tables/masters";
import {releases} from "~/server/db/tables/releases";
import {tracks} from "~/server/db/tables/tracks";

export const externalIdentifiers = createTable('external_identifiers', {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    discogs_url: varchar('discogs_url', {length: 256}),
    spotify_url: varchar('spotify_url', {length: 256}),
    isrc: varchar('isrc', {length: 256}),
    ean: varchar('ean', {length: 256}),
    upc: varchar('upc', {length: 256}),
});

export const externalIdentifiersRelations = relations(externalIdentifiers, ({one}) => ({
    artist: one(artists, {
        fields: [externalIdentifiers.id],
        references: [artists.externalIdentifier],
    }),
    items: one(items, {
        fields: [externalIdentifiers.id],
        references: [items.externalIdentifier],
    }),
    masters: one(masters, {
        fields: [externalIdentifiers.id],
        references: [masters.externalIdentifier],
    }),
    releases: one(releases, {
        fields: [externalIdentifiers.id],
        references: [releases.externalIdentifier],
    }),
    tracks: one(tracks, {
        fields: [externalIdentifiers.id],
        references: [tracks.externalIdentifier],
    }),
}));
