import {createTable} from "~/server/utils/createTable";
import {serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm/relations";
import {userPreferences} from "~/server/db/tables/userPreferences";

export const users = createTable(
    "users",
    {
        id: serial('id').primaryKey().notNull(),
        clerkId: varchar('clerkId').unique().notNull(),
        email: varchar('email', {length: 256}).unique().notNull(),
        lastLogin: timestamp('last_login').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date())
    },
)
export const userRelations = relations(users, ({many}) => ({
    userPreferences: many(userPreferences),
}));