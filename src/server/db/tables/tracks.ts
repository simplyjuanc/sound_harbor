import {relations} from "drizzle-orm/relations";
import {masters} from "~/server/db/tables/masters";
import {createTable} from "~/server/utils/createTable";
import {integer, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {releases} from "~/server/db/tables/releases";
import {externalIdentifiers} from "~/server/db/tables/externalIdentifiers";
import {artistsToTracks, userPreferencesToTracks} from "~/server/db/tables/nmRelations";

export const tracks = createTable('tracks', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', {length: 256}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    duration: integer('duration').notNull(),
    trackNumber: integer('track_number'),
    discNumber: integer('disc_number'),
    albumId: integer('album_id').references(() => releases.id),
    masterId: integer('master_id').references(() => masters.id),
    externalIdentifier: integer('external_identifiers').references(() => externalIdentifiers.id)
});

export const tracksRelations = relations(tracks, ({one, many}) => ({
    master: one(masters,
        {
            relationName: "tracklist",
            references: [masters.id],
            fields: [tracks.masterId]
        }),
    artistsToTracks: many(artistsToTracks),
    tracksToUserPreferences: one(userPreferencesToTracks, {
        fields: [tracks.id],
        references: [userPreferencesToTracks.trackId],
    }),
}));
