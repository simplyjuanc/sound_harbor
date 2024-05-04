
import { type users } from "./schema/users";
import { type userPreferences } from "./schema/user_preferences";



export type UserPreferences = typeof userPreferences.$inferSelect;
export type User = typeof users.$inferSelect;

