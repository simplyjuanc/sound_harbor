import {relations} from "drizzle-orm/relations";
import {masters} from "~/server/db/tables/masters";
import {items} from "~/server/db/tables/items";
import {createTable} from "~/server/utils/createTable";
import {date, integer, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {DatePrecisionEnum} from "~/server/db/enums";
import {externalIdentifiers} from "~/server/db/tables/externalIdentifiers";
import {releasesToFormats} from "~/server/db/tables/nmRelations";

export const releases = createTable('releases', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', {length: 256}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    releaseDate: date('release_date'),
    releaseDatePrecision: DatePrecisionEnum('release_date_precision'),
    masterId: integer('master_id').notNull(),
    total_tracks: integer('total_tracks').notNull(),
    total_duration: integer('total_duration').notNull(),
    externalIdentifier: integer('external_identifier').references(() => externalIdentifiers.id)
});

export const releasesRelations = relations(releases, ({one, many}) => ({
    master: one(masters,
        {
            fields: [releases.masterId],
            references: [masters.id],
        }),
    items: many(items),
    formats: many(releasesToFormats),
}));
