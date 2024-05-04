import { relations } from "drizzle-orm/relations";
import { createTable } from "../createTable";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { userPreferences } from "./userPreferences";



export const users = createTable(
  "users",
  {
    id: serial('id').primaryKey().notNull(),
    clerkId: varchar('clerkId').unique().notNull(),
    email: varchar('email', { length: 256 }).unique().notNull(),
    lastLogin: timestamp('last_login', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date())
  },
)

export const userToUserPreferencesRelations = relations(users, ({ many }) => ({
  userId: many(userPreferences,),
}));