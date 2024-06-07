import {artists} from "~/server/db/tables/artists";
import {items} from "~/server/db/tables/items";
import {externalIdentifiers} from "~/server/db/tables/externalIdentifiers";
import {formats} from "~/server/db/tables/formats";
import {masters} from "~/server/db/tables/masters";
import {releases} from "~/server/db/tables/releases";
import {tracks} from "~/server/db/tables/tracks";
import {userPreferences} from "~/server/db/tables/userPreferences";
import {users} from "~/server/db/tables/userRelations";


export type Artist = typeof artists.$inferSelect;
export type Item = typeof items.$inferSelect;
export type ExternalIdentifier = typeof externalIdentifiers.$inferSelect;
export type Format = typeof formats.$inferSelect;
export type Master = typeof masters.$inferSelect;
export type Release = typeof releases.$inferSelect;
export type Track = typeof tracks.$inferSelect;
export type UserPreference = typeof userPreferences.$inferSelect;
export type User = typeof users.$inferSelect;
