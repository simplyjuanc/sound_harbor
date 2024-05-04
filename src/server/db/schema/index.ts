
import * as users from "./users";
import * as userPreferences from "./user_preferences";


const schema = {
  ...users,
  ...userPreferences,
}


export default schema;