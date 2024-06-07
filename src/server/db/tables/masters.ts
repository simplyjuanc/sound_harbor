import {createTable} from "~/server/utils/createTable";
import {date, integer, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {DatePrecisionEnum} from "~/server/db/enums";
import {externalIdentifiers} from "~/server/db/tables/externalIdentifiers";
import {relations} from "drizzle-orm/relations";
import {artistsToMasters} from "~/server/db/tables/nmRelations";
import {releases} from "~/server/db/tables/releases";
import {tracks} from "~/server/db/tables/tracks";

export const masters = createTable('masters', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', {length: 256}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    releaseDate: date('release_date'),
    releaseDatePrecision: DatePrecisionEnum('release_date_precision'),
    total_tracks: integer('total_tracks').notNull(),
    total_duration: integer('total_duration').notNull(),
    mainReleaseId: integer('main_release_id').references(() => releases.id),
    externalIdentifier: integer('external_identifiers').references(() => externalIdentifiers.id)
});

export const mastersRelations = relations(masters, ({one, many}) => ({
    releases: many(releases),
    artists: one(artistsToMasters,
        {
            fields: [masters.id],
            references: [artistsToMasters.masterId],
        }),
    tracklist: many(tracks, {relationName: "tracklist"}),
}));
