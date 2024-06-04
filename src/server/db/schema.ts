import {relations} from "drizzle-orm/relations";
import {createTable} from "../utils/createTable";
import {date, integer, numeric, pgEnum, primaryKey, serial, text, timestamp, varchar} from "drizzle-orm/pg-core";



export const DatePrecisionEnum = pgEnum('release_date_precision', ['YEAR', 'MONTH', 'DAY']);
export const ConditionEnum = pgEnum('condition', ['MINT', 'NEAR_MINT', 'VERY_GOOD_PLUS', 'VERY_GOOD', 'GOOD_LUS', 'GOOD', 'FAIR', 'POOR'])
export const UserPreferencesEnum = pgEnum('type', ['ARTIST', 'RELEASE', 'TRACK']);
export const RecordSpeedEnum = pgEnum('speed', ['33', '45', '78']);



export const artists = createTable(
  "artists",
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    profile: text('profile'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    externalIdentifier: integer('external_identifier').references(() => externalIdentifiers.id)
  },
)


export const artistRelations = relations(artists, ({ one, many }) => ({
    preferencesToArtists: many(userPreferencesToArtists),
    externalIdentifiers: one(externalIdentifiers)
}));



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


export const items = createTable('items', {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    price: numeric('price', { precision: 2 }).notNull(),
    condition: ConditionEnum('condition'),
    notes: text('notes'),
    releaseId: integer('release_id').notNull(),
    formatId: integer('format_id').notNull(),
    externalIdentifier: integer('external_identifiers').references(() => externalIdentifiers.id)
})



export const itemsRelations = relations(items, ({ one }) => ({
    release: one(releases, {
        fields: [items.releaseId],
        references: [releases.id],
    }),
    format: one(formats, {
        fields: [items.formatId],
        references: [formats.id],
    }),
}));



export const externalIdentifiers = createTable('external_identifiers', {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    discogs_url: varchar('discogs_url', { length: 256 }),
    spotify_url: varchar('spotify_url', { length: 256 }),
    isrc: varchar('isrc', { length: 256 }),
    ean: varchar('ean', { length: 256 }),
    upc: varchar('upc', { length: 256 }),
});


export const externalIdentifiersRelations = relations(externalIdentifiers, ({ one }) => ({
    artist: one(artists, {
        fields: [externalIdentifiers.id],
        references: [artists.externalIdentifier],
    }),
    items: one(items, {
        fields: [externalIdentifiers.id],
        references: [items.externalIdentifier],
    }),
    masters: one(masters, {
        fields: [externalIdentifiers.id],
        references: [masters.externalIdentifier],
    }),
    releases: one(releases, {
        fields: [externalIdentifiers.id],
        references: [releases.externalIdentifier],
    }),
    tracks: one(tracks, {
        fields: [externalIdentifiers.id],
        references: [tracks.externalIdentifier],
    }),
}));




export const formats = createTable(
    'formats',
    {
        id: serial('id').primaryKey().notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
        type: varchar('type', { length: 256 }).notNull(),
        itemQuantity: integer('item_quantity').notNull(),
        speed: RecordSpeedEnum('speed').notNull(),
    },
);


export const formatsRelations = relations(formats, ({ many }) => ({
    releases: many(releasesToFormats)
}));



export const masters = createTable('masters', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    releaseDate: date('release_date'),
    releaseDatePrecision: DatePrecisionEnum('release_date_precision'),
    total_tracks: integer('total_tracks').notNull(),
    total_duration: integer('total_duration').notNull(),
    mainReleaseId: integer('main_release_id').references(() => releases.id),
    externalIdentifier: integer('external_identifiers').references(() => externalIdentifiers.id)
});



export const mastersRelations = relations(masters, ({ one, many }) => ({
    // mainRelease: one(releases, {
    //     relationName: 'mainRelease',
    //     fields: [masters.mainReleaseId],
    //     references: [releases.id],
    // }),
    releases: many(releases,
        // { relationName: 'releases'}
    ),
    artists: one(artistsToMasters, {
        fields: [masters.id],
        references: [artistsToMasters.masterId],
    }),
    tracklist: many(tracks, { relationName: "tracklist"}),
}));





export const releases = createTable('releases', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    releaseDate: date('release_date'),
    releaseDatePrecision: DatePrecisionEnum('release_date_precision'),
    masterId: integer('master_id').notNull(),
    total_tracks: integer('total_tracks').notNull(),
    total_duration: integer('total_duration').notNull(),
    externalIdentifier: integer('external_identifier').references(() => externalIdentifiers.id)
});



export const releasesRelations = relations(releases, ({ one, many }) => ({
    master: one(masters, {
        fields: [releases.masterId],
        references: [masters.id],
    }),
    items: many(items),
    formats: many(releasesToFormats),

    // releasesToExternalIds: one(externalIds, {
    //   fields: [releases.id],
    //   references: [externalIds.id],
    // }),
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



export const tracks = createTable('tracks', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    duration: integer('duration').notNull(),
    trackNumber: integer('track_number'),
    discNumber: integer('disc_number'),
    albumId: integer('album_id').references(() => releases.id),
    masterId: integer('master_id').references(() => masters.id),
    externalIdentifier: integer('external_identifiers').references(() => externalIdentifiers.id)
});

export const tracksRelations = relations(tracks, ({ one, many }) => ({
    master: one(masters,
        {
            relationName: "tracklist",
            references: [masters.id],
            fields: [tracks.masterId]
        }),
    artistsToTracks: many(artistsToTracks),
    tracksToUserPreferences: one(userPreferencesToTracks, {
        fields: [tracks.id],
        references: [userPreferencesToTracks.trackId],
    }),
}));





export const userPreferences = createTable(
    "user_preferences",
    {
        id: serial('id').primaryKey().notNull(),
        type: UserPreferencesEnum('type'),
        rank: integer('rank').notNull(),
        userId: integer('user_id').notNull().references(() => users.id),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    },
)


export const userPreferencesRelations = relations(userPreferences, ({ many }) => ({
    preferencesToArtists: many(userPreferencesToArtists),
    preferencesToReleases: many(releases),
    preferencesToTracks: many(tracks),
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



export const preferencesToArtistRelations = relations(userPreferencesToArtists, ({ one }) => ({
    preference: one(userPreferences, {
        fields: [userPreferencesToArtists.preferenceId],
        references: [userPreferences.id],
    }),
    user: one(artists, {
        fields: [userPreferencesToArtists.artistId],
        references: [artists.id],
    }),
}));



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
    (t) => ({ pk: primaryKey({ columns: [t.preferenceId, t.trackId] }) })
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
    userId: many(userPreferences,),
}));

