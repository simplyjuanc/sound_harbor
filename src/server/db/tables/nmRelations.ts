import {relations} from "drizzle-orm/relations";
import {createTable} from "../../utils/createTable";
import {integer, primaryKey, timestamp} from "drizzle-orm/pg-core";
import {artists} from "~/server/db/tables/artists";
import {formats} from "~/server/db/tables/formats";
import {masters} from "~/server/db/tables/masters";
import {releases} from "~/server/db/tables/releases";
import {tracks} from "~/server/db/tables/tracks";
import {userPreferences} from "~/server/db/tables/userPreferences";


export const artistsToMasters = createTable(
    'artists_to_masters',
    {
        artistId: integer('artist_id')
            .notNull()
            .references(() => artists.id),
        masterId: integer('master_id')
            .notNull()
            .references(() => masters.id),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.masterId, t.artistId] }),
    })
);



export const artistToMastersRelations = relations(artistsToMasters, ({ one }) => ({
    preference: one(masters, {
        fields: [artistsToMasters.masterId],
        references: [masters.id],
    }),
    user: one(artists, {
        fields: [artistsToMasters.artistId],
        references: [artists.id],
    }),
}));



export const artistsToTracks = createTable(
    'artists_to_tracks',
    {
        artistId: integer('artist_id')
            .notNull()
            .references(() => artists.id),
        trackId: integer('track_id')
            .notNull()
            .references(() => tracks.id),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.trackId, t.artistId] }),
    })
);



export const artistToTracksRelations = relations(artistsToTracks, ({ one }) => ({
    preference: one(tracks, {
        fields: [artistsToTracks.trackId],
        references: [tracks.id],
    }),
    user: one(artists, {
        fields: [artistsToTracks.artistId],
        references: [artists.id],
    }),
}));





export const releasesToFormats = createTable('releases_to_formats', {
        releaseId: integer('release_id').notNull(),
        formatId: integer('format_id').notNull(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.releaseId, t.formatId] }),
    })
);


export const releasesToFormatsRelations = relations(releasesToFormats, ({ one }) => ({
    release: one(releases, {
        fields: [releasesToFormats.releaseId],
        references: [releases.id],
    }),
    format: one(formats, {
        fields: [releasesToFormats.formatId],
        references: [formats.id],
    }),
}));





export const userPreferencesToArtists = createTable(
    'user_preferences_to_artists',
    {
        preferenceId: integer('preference_id')
            .notNull()
            .references(() => userPreferences.id),
        artistId: integer('artist_id')
            .notNull()
            .references(() => artists.id),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.preferenceId, t.artistId] }),
    })
);



export const userPreferencesToArtistRelations = relations(userPreferencesToArtists, ({ one }) => ({
    preference: one(userPreferences, {
        fields: [userPreferencesToArtists.preferenceId],
        references: [userPreferences.id],
    }),
    user: one(artists, {
        fields: [userPreferencesToArtists.artistId],
        references: [artists.id],
    }),
}));


export const userPreferencesToMasters = createTable(
    "user_preferences_to_masters",
    {
        preferenceId: integer('preference_id')
            .notNull()
            .references(() => userPreferences.id),
        masterId: integer('master_id')
            .notNull()
            .references(() => masters.id),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    },
    (t) => ({ pk: primaryKey({ columns: [t.preferenceId, t.masterId] }) })
);


export const userPreferencesToMastersRelations = relations(userPreferencesToMasters, ({ one }) => ({
        preference: one(userPreferences,
            {
                fields: [userPreferencesToMasters.preferenceId],
                references: [userPreferences.id],
            }),
        masters: one(masters,
            {
                fields: [userPreferencesToMasters.masterId],
                references: [masters.id],
            })
    }
));


export const userPreferencesToTracks = createTable(
    'user_preferences_to_tracks',
    {
        preferenceId: integer('preference_id')
            .notNull()
            .references(() => userPreferences.id),
        trackId: integer('track_id')
            .notNull()
            .references(() => tracks.id),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.preferenceId, t.trackId] })
    })
);


export const userPreferencesToTracksRelations = relations(userPreferencesToTracks, ({ one }) => ({
    preference: one(userPreferences, {
        fields: [userPreferencesToTracks.preferenceId],
        references: [userPreferences.id],
    }),
    tracks: one(tracks, {
        fields: [userPreferencesToTracks.trackId],
        references: [tracks.id],
    })
}));


