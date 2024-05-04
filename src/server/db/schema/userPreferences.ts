import { createTable } from "../createTable";
import { integer, pgEnum, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm/relations";
import { preferencesToArtists } from "./preferencesToArtists";


const UserPreferencesEnum = pgEnum('type', ['artist', 'release', 'track']);


export const userPreferences = createTable(
  "user_preferences",
  {
    id: serial('id').primaryKey().notNull(),
    type: UserPreferencesEnum('type'),
    rank: integer('rank').notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  },
)


export const userPreferencesRelations = relations(userPreferences, ({ many }) => ({
  preferencesToArtists: many(preferencesToArtists)
}));
