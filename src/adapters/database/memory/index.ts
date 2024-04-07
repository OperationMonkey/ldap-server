import type { Person } from "../../../entities";
import type { Database } from "../../../ports/database.port";

export function getMemoryDatabase(): Database {
  return Object.freeze({
    async authenticateUser(_cn: string, _password: string): Promise<boolean> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
    async findUser(_cn: string): Promise<Person> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
  });
}
