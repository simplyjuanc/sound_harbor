import { relations } from "drizzle-orm/relations";
import { createTable } from "../../utils/createTable";
import { integer, pgEnum, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { releasesToFormats } from "./releasesToFormats";


export const RecordSpeedEnum = pgEnum('speed', ['33', '45', '78']);


export const formats = createTable(
  'formats',
  {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    type: varchar('type', { length: 256 }).notNull(),
    itemQuantity: integer('item_quantity').notNull(),
    speed: RecordSpeedEnum('speed').notNull(),
  },
);


export const formatsRelations = relations(formats, ({ many }) => ({
  releases: many(releasesToFormats)
}));