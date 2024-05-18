    import { relations } from "drizzle-orm/relations";
import { createTable } from "../../utils/createTable";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { userPreferences } from "./userPreferences";



export const users = createTable(
  "users",
  {
    id: serial('id').primaryKey().notNull(),
    clerkId: varchar('clerkId').unique().notNull(),
    email: varchar('email', { length: 256 }).unique().notNull(),
    lastLogin: timestamp('last_login').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date())
  },
)

export const userToUserPreferencesRelations = relations(users, ({ many }) => ({
  userId: many(userPreferences),
}));