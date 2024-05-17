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


export type ExternalIdentifiers = typeof externalIdentifiers.externalIdentifiers.$inferSelect;
export type Users = typeof users.users.$inferSelect;
export type UserPreferences = typeof userPreferences.userPreferences.$inferSelect;
export type Artists = typeof artists.artists.$inferSelect;
export type Tracks = typeof tracks.tracks.$inferSelect;
export type Releases = typeof releases.releases.$inferSelect;
export type Masters = typeof masters.masters.$inferSelect;
export type Formats = typeof formats.formats.$inferSelect;
export type Items = typeof items.items.$inferSelect;
