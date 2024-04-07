import type { Database } from "../../ports/database.port";
import { env } from "../env";
import { logger } from "../logger";

import { getMemoryDatabase } from "./memory";

import { getSqliteDatabase } from "./sqlite";

function createDatabaseAdapter(): Database {
  logger.info(`Initializing ${env.databaseType} database...`);

  switch (env.databaseType) {
    case "memory":
      return getMemoryDatabase();
    case "sqlite":
      return getSqliteDatabase();
    default:
      env.databaseType satisfies never;
  }

  throw new Error("Unknown database type");
}

export const database = createDatabaseAdapter();
