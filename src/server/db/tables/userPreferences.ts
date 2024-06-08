import {createTable} from "~/server/utils/createTable";
import {integer, serial, timestamp} from "drizzle-orm/pg-core";
import {UserPreferencesEnum} from "~/server/db/enums";
import {relations} from "drizzle-orm/relations";
import {userPreferencesToArtists, userPreferencesToMasters, userPreferencesToTracks} from "~/server/db/tables/nmRelations";
import {users} from "~/server/db/tables/users";

export const userPreferences = createTable(
    "user_preferences",
    {
        id: serial('id').primaryKey().notNull(),
        type: UserPreferencesEnum('type'),
        rank: integer('rank').notNull(),
        userId: integer('user_id').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    },
)

export const userPreferencesRelations = relations(userPreferences, ({one, many}) => ({
    user: one(users, {
        fields: [userPreferences.userId],
        references: [users.id],
    }),
    preferencesToArtists: many(userPreferencesToArtists),
    preferencesToMasters: many(userPreferencesToMasters),
    preferencesToTracks: many(userPreferencesToTracks),
}));
