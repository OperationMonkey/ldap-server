import type { Person } from "../entities";

export interface Database {
  authenticateUser: (cn: string, password: string) => Promise<boolean>;
  findUser: (cn: string) => Promise<Person>;
}
