import { createTable } from ".";
import { integer, pgEnum, serial, } from "drizzle-orm/pg-core";
import users from "./users";


const UserPreferencesEnum = pgEnum('type', ['artist', 'release', 'track']);


export const userPreferences = createTable(
  "user_preferences",
  {
    id: serial('id').primaryKey().notNull(),
    type: UserPreferencesEnum('type').notNull(),
    rank: integer('rank').notNull(),
    userId: integer('user_id').notNull().references(() => users.id)
  },
)


export type UserPreferences = typeof userPreferences.$inferSelect;