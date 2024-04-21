import type { Database } from "../../ports/database.port";
import { env } from "../env";
import { logger } from "../logger";

import { getMemoryDatabase } from "./memory";

function createDatabaseAdapter(): Database {
  logger.info(`Initializing ${env.databaseType} database...`);

  switch (env.databaseType) {
    case "memory":
      return getMemoryDatabase();
    default:
      env.databaseType satisfies never;
  }

  throw new Error("Unknown database type");
}

// eslint-disable-next-line import/no-unused-modules
export const database = createDatabaseAdapter();
