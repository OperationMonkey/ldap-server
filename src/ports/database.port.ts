import type { PosixAccount, PosixGroup } from "../entities";

export interface Database {
  authenticateUser: (uid: string, password: string) => Promise<boolean>;
  findUser: (uid: string) => Promise<PosixAccount>;
  findGroup: (cn: string) => Promise<PosixGroup>;
}
