import * as artists from "~/server/db/tables/artists";
import * as externalIdentifiers from "~/server/db/tables/externalIdentifiers";
import * as formats from "~/server/db/tables/formats";
import * as items from "~/server/db/tables/items";
import * as masters from "~/server/db/tables/masters";
import * as nmRelations from "~/server/db/tables/nmRelations";
import * as releases from "~/server/db/tables/releases";
import * as tracks from "~/server/db/tables/tracks";
import * as users from "~/server/db/tables/users";
import * as userPreferences from "~/server/db/tables/userPreferences";



export const schema = {
  ...artists,
  ...externalIdentifiers,
  ...formats,
  ...items,
  ...masters,
  ...nmRelations,
  ...releases,
  ...tracks,
  ...users,
  ...userPreferences,
};
