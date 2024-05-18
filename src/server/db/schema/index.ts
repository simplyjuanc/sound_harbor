import * as externalIdentifiers from "./externalIdentifiers";
import * as users from "./users";
import * as userPreferences from "./userPreferences";
import * as artists from "./artists";
import * as tracks from "./tracks";
import * as releases from "./releases";
import * as masters from "./masters";
import * as formats from "./formats";
import * as items from "./items";
import * as releasesToFormats from "./releasesToFormats";
import * as artistsToTracks from "./artistsToTracks";
import * as artistsToMasters from "./artistsToMasters";
import * as preferencesToTracks from "./userPreferencesToTracks";
import * as preferencesToArtists from "./userPreferencesToArtists";



export const schema = {
  ...externalIdentifiers,
  ...users,
  ...userPreferences,
  ...artists,
  ...tracks,
  ...releases,
  ...masters,
  ...formats,
  ...items,
  ...releasesToFormats,
  ...artistsToTracks,
  ...artistsToMasters,
  ...preferencesToTracks,
  ...preferencesToArtists
};


export type ExternalIdentifier = typeof externalIdentifiers.externalIdentifiers.$inferSelect;
export type User = typeof users.users.$inferSelect;
export type UserPreference = typeof userPreferences.userPreferences.$inferSelect;
export type Artist = typeof artists.artists.$inferSelect;
export type Track = typeof tracks.tracks.$inferSelect;
export type Release = typeof releases.releases.$inferSelect;
export type Master = typeof masters.masters.$inferSelect;
export type Format = typeof formats.formats.$inferSelect;
export type Item = typeof items.items.$inferSelect;
