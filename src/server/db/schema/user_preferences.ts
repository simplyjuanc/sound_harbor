import { createTable } from "../index";
import { integer, pgEnum, serial, } from "drizzle-orm/pg-core";
import { users } from "./users";


const UserPreferencesEnum = pgEnum('type', ['artist', 'release', 'track']);


export const userPreferences = createTable(
  "user_preferences",
  {
    id: serial('id').primaryKey().notNull(),
    type: UserPreferencesEnum('type'),
    rank: integer('rank').notNull(),
    userId: integer('user_id').notNull().references(() => users.id)
  },
)
