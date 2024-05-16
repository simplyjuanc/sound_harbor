import { integer, primaryKey } from "drizzle-orm/pg-core";
import { createTable } from "../../utils/createTable";
import { relations } from "drizzle-orm/relations";
import { formats } from "./formats";
import { releases } from "./releases";




export const releasesToFormats = createTable('releases_to_formats', {
  releaseId: integer('release_id').notNull(),
  formatId: integer('format_id').notNull(),
},
  (t) => ({
    pk: primaryKey({ columns: [t.releaseId, t.formatId] }),
  })
);


export const releasesToFormatsRelations = relations(releasesToFormats, ({ one }) => ({
  release: one(releases, {
    fields: [releasesToFormats.releaseId],
    references: [releases.id],
  }),
  format: one(formats, {
    fields: [releasesToFormats.formatId],
    references: [formats.id],
  }),
}));
