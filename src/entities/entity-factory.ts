import type { Database } from "../ports/database.port";

import { createPosixAccount, type PosixAccount } from "./posix-account";

export interface Entity {
  save: () => Promise<void>;
  load: (id: string) => Promise<void>;
}

type CreatePosixAccount = () => PosixAccount & Entity;

export interface EntityFactory {
  createPosixAccount: CreatePosixAccount;
}

export function createEntityFactory(_database: Database): EntityFactory {
  return {
    createPosixAccount: createPosixAccount,
  };
}
