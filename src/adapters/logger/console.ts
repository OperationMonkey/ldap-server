import type { Logger } from "../../ports/logger.port";

export function createConsoleLogger(): Logger {
  return Object.freeze({
    error(message: string): void {
      console.error(message);
    },
    info(message: string): void {
      console.info(message);
    },
    debug(message: string): void {
      console.debug(message);
    },
  });
}
