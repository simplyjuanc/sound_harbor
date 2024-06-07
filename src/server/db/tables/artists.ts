import {createTable} from "~/server/utils/createTable";
import {integer, serial, text, timestamp, varchar} from "drizzle-orm/pg-core";
import {userPreferencesToArtists} from "~/server/db/tables/nmRelations";
import {relations} from "drizzle-orm/relations";
import {externalIdentifiers} from "~/server/db/tables/externalIdentifiers";

export const artists = createTable(
    "artists",
    {
        id: serial('id').primaryKey().notNull(),
        name: varchar('name', {length: 256}).notNull(),
        profile: text('profile'),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
        externalIdentifier: integer('external_identifier').references(() => externalIdentifiers.id)
    },
)

export const artistRelations = relations(artists, ({one, many}) => ({
        preferencesToArtists: many(userPreferencesToArtists),
        externalIdentifiers: one(externalIdentifiers)
}));
