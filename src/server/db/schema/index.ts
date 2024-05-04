
import { pgTableCreator } from "drizzle-orm/pg-core";
import * as users from "./users";
import * as userPreferences from "./user_preferences";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `soundharbor_${name}`);

const schema = {
  ...users,
  ...userPreferences,
}



export default schema;