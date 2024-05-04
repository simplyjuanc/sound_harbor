import { relations } from "drizzle-orm/relations";
import { createTable } from "../createTable";
import { preferencesToArtists } from "./preferencesToArtists";
import { serial, text, timestamp, varchar } from "drizzle-orm/pg-core";



export const artists = createTable(
  "artists",
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    profile: text('profile'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  },
)


export const artistRelations = relations(artists, ({ many }) => ({
  userPreferencesToArtistRelations: many(preferencesToArtists)
}));

