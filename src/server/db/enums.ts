import {pgEnum} from "drizzle-orm/pg-core";

export const DatePrecisionEnum = pgEnum('release_date_precision', ['YEAR', 'MONTH', 'DAY']);
export const ConditionEnum = pgEnum('condition', ['MINT', 'NEAR_MINT', 'VERY_GOOD_PLUS', 'VERY_GOOD', 'GOOD_LUS', 'GOOD', 'FAIR', 'POOR'])
export const UserPreferencesEnum = pgEnum('type', ['ARTIST', 'RELEASE', 'TRACK']);
export const RecordSpeedEnum = pgEnum('speed', ['33', '45', '78']);
