import * as artists from "./artists";
import * as preferencesToArtists from "./preferencesToArtists";
import * as tracks from "./tracks";
import * as userPreferences from "./userPreferences";
import * as users from "./users";
import * as releases from "./releases";
import * as masters from "./masters";


export const schema = {
  ...artists,
  ...preferencesToArtists,
  ...userPreferences,
  ...users,
  ...tracks,
  ...releases,
  ...masters,
};


export type UserPreferences = typeof userPreferences.userPreferences.$inferSelect;
export type User = typeof users.users.$inferSelect;


