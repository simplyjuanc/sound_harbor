import {relations} from "drizzle-orm/relations";
import {createTable} from "~/server/utils/createTable";
import {integer, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {RecordSpeedEnum} from "~/server/db/enums";
import {releasesToFormats} from "~/server/db/tables/nmRelations";

export const formats = createTable(
    'formats',
    {
        id: serial('id').primaryKey().notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
        type: varchar('type', {length: 256}).notNull(),
        itemQuantity: integer('item_quantity').notNull(),
        speed: RecordSpeedEnum('speed').notNull(),
    },
);


export const formatsRelations = relations(formats, ({many}) => ({
    releases: many(releasesToFormats)
}));