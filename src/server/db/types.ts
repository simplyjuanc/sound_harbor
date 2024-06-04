import {
    type artists,
    type externalIdentifiers,
    type formats,
    type items,
    type masters,
    type releases,
    type tracks,
    type userPreferences,
    type users
} from "~/server/db/schema";


export type Artist = typeof artists.$inferSelect;
export type Item = typeof items.$inferSelect;
export type ExternalIdentifier = typeof externalIdentifiers.$inferSelect;
export type Format = typeof formats.$inferSelect;
export type Master = typeof masters.$inferSelect;
export type Release = typeof releases.$inferSelect;
export type Track = typeof tracks.$inferSelect;
export type UserPreference = typeof userPreferences.$inferSelect;
export type User = typeof users.$inferSelect;
