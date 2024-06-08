import {type artists} from "~/server/db/tables/artists";
import {type items} from "~/server/db/tables/items";
import {type externalIdentifiers} from "~/server/db/tables/externalIdentifiers";
import {type formats} from "~/server/db/tables/formats";
import {type masters} from "~/server/db/tables/masters";
import {type releases} from "~/server/db/tables/releases";
import {type tracks} from "~/server/db/tables/tracks";
import {type users} from "~/server/db/tables/users";
import {type userPreferences} from "~/server/db/tables/userPreferences";


export type Artist = typeof artists.$inferSelect;
export type Item = typeof items.$inferSelect;
export type ExternalIdentifier = typeof externalIdentifiers.$inferSelect;
export type Format = typeof formats.$inferSelect;
export type Master = typeof masters.$inferSelect;
export type Release = typeof releases.$inferSelect;
export type Track = typeof tracks.$inferSelect;
export type User = typeof users.$inferSelect;
export type UserPreference = typeof userPreferences.$inferSelect;
