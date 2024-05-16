import { integer, numeric, pgEnum, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "../../utils/createTable";
import { relations } from "drizzle-orm/relations";
import { releases } from "./releases";
import { formats } from "./formats";
import {externalIdentifiers} from "~/server/db/schema/externalIdentifiers";



export const OwnerTypeEnum = pgEnum('owner_type', ['user', 'store']);
export const ConditionEnum = pgEnum('condition', ['mint', 'near mint', 'very good plus', 'very good', 'good plus', 'good', 'fair', 'poor'])


export const items = createTable('items', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  price: numeric('price', { precision: 2 }).notNull(),
  condition: ConditionEnum('condition'),
  notes: text('notes'),
  releaseId: integer('release_id').notNull(),
  formatId: integer('format_id').notNull(),
  externalIdentifiers: serial('external_identifiers').references(() => externalIdentifiers.id)
})



export const itemsRelations = relations(items, ({ one }) => ({
  release: one(releases, {
    fields: [items.releaseId],
    references: [releases.id],
  }),
  format: one(formats, {
    fields: [items.formatId],
    references: [formats.id],
  }),
}));