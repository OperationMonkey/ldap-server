import type { Person } from "../../../entities";
import type { Database } from "../../../ports/database.port";

export function getSqliteDatabase(): Database {
  return {
    async authenticateUser(_cn: string, _password: string): Promise<boolean> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
    findUser(_cn: string): Promise<Person> {
      throw new Error("Not yet implemented");
    },
  };
}
