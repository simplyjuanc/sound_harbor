import { pgEnum, pgTableCreator } from "drizzle-orm/pg-core";




export const datePrecision = pgEnum('release_date_precision', ['year', 'month', 'day']);


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */


export const createTable = pgTableCreator((name) => `sh_${name}`);

