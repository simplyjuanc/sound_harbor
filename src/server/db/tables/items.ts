import {createTable} from "~/server/utils/createTable";
import {integer, numeric, serial, text, timestamp} from "drizzle-orm/pg-core";
import {ConditionEnum} from "~/server/db/enums";
import {relations} from "drizzle-orm/relations";
import {externalIdentifiers} from "~/server/db/tables/externalIdentifiers";
import {formats} from "~/server/db/tables/formats";
import {releases} from "~/server/db/tables/releases";

export const items = createTable('items', {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    price: numeric('price', {precision: 2}).notNull(),
    condition: ConditionEnum('condition'),
    notes: text('notes'),
    releaseId: integer('release_id').notNull(),
    formatId: integer('format_id').notNull(),
    externalIdentifier: integer('external_identifiers').references(() => externalIdentifiers.id)
})


export const itemsRelations = relations(items, ({one}) => ({
    release: one(releases, {
        fields: [items.releaseId],
        references: [releases.id],
    }),
    format: one(formats, {
        fields: [items.formatId],
        references: [formats.id],
    }),
}));
