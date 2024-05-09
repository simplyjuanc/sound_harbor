import * as artists from "./artists";
import * as preferencesToArtists from "./preferencesToArtists";
import * as tracks from "./tracks";
import * as userPreferences from "./userPreferences";
import * as users from "./users";
import * as releases from "./releases";
import * as masters from "./masters";
import * as artistsToMasters from "./artistsToMasters";
import * as preferencesToTracks from "./userPreferencesToTracks";

export const schema = {
  ...artists,
  ...preferencesToArtists,
  ...users,
  ...userPreferences,
  ...preferencesToTracks,
  ...tracks,
  ...releases,
  ...masters,
  ...artistsToMasters
};


export type UserPreferences = typeof userPreferences.userPreferences.$inferSelect;
export type User = typeof users.users.$inferSelect;


