import type { Person } from "../../../entities";
import type { Database } from "../../../ports/database.port";

export function getMemoryDatabase(): Database {
  return {
    async authenticateUser(_cn: string, _password: string): Promise<boolean> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
    async findUser(_cn): Promise<Person> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
  };
}
