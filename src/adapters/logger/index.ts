import type { Logger } from "../../ports/logger.port";
import { env } from "../env";

import { createConsoleLogger } from "./console";

export const logger = (function createLogger(): Logger {
  switch (env.logger) {
    case "console":
      return createConsoleLogger();
    default:
      env.logger satisfies never;
  }

  throw new Error("Unknown logger type");
})();
