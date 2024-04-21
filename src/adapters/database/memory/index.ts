import type { PosixAccount, PosixGroup } from "../../../entities";
import type { Database } from "../../../ports/database.port";

export function getMemoryDatabase(): Database {
  return Object.freeze({
    async authenticateUser(_uid: string, _password: string): Promise<boolean> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
    async findUser(_uid: string): Promise<PosixAccount> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
    async findGroup(_cn: string): Promise<PosixGroup> {
      await Promise.resolve();

      throw new Error("Not yet implemented");
    },
  });
}
