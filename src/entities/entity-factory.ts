import type { Database } from "../ports/database.port";

import type { PosixAccount } from "./posix-account";

export interface Entity {
  save: () => Promise<void>;
  load: (id: string) => Promise<void>;
}

type CreatePosixAccount = () => PosixAccount & Entity;

export interface EntityFactory {
  createPosixAccount: CreatePosixAccount;
}

function createEditableProperty(
  values: Map<string, string | number | Array<string>>,
  name: string,
  type: "string" | "number"
): PropertyDescriptor {
  return {
    get(): string | number | Array<string> | undefined {
      return values.get(name);
    },
    set(value: string | number): void {
      if (typeof value === type) {
        values.set(name, value);
      } else {
        throw new Error("Type mismatch");
      }
    },
    enumerable: true,
    configurable: false,
  };
}

function createProperty(
  values: Map<string, string | number | Array<string>>,
  name: string,
  value?: string | number | Array<string>,
  enumerable: boolean = true
): PropertyDescriptor {
  if (value) {
    values.set(name, value);
  }

  return {
    get(): string | number | Array<string> | undefined {
      return values.get(name);
    },
    set(): void {
      throw new Error("Attribute cannot be changed");
    },
    enumerable,
    configurable: false,
  };
}

export function createEntityFactory(_database: Database): EntityFactory {
  return {
    createPosixAccount(): PosixAccount & Entity {
      const values = new Map<string, string | number | Array<string>>();

      const o = {
        async save(): Promise<void> {
          await Promise.resolve();

          return;
        },
        async load(_id: string): Promise<void> {
          await Promise.resolve();

          return;
        },
      };

      Object.defineProperties(o, {
        id: createProperty(values, "id", undefined, false),
        objectClass: createProperty(values, "objectClass", ["top", "person", "posixAccount"]),
        uid: createEditableProperty(values, "uid", "string"),
        uidNumber: createEditableProperty(values, "uidNumber", "number"),
        gidNumber: createEditableProperty(values, "gidNumber", "number"),
        loginShell: createEditableProperty(values, "loginShell", "string"),
        cn: createEditableProperty(values, "cn", "string"),
        gecos: createProperty(values, "cn"),
        mail: createEditableProperty(values, "mail", "string"),
        dn: {
          get(): string {
            /**
             * @todo handle organization
             */
            return `uid=${values.get("uid") as string},ou=users,o=[organization]`;
          },
          set() {
            throw new Error("dn cannot be set");
          },
          enumerable: true,
          configurable: false,
        },
      });

      return o as PosixAccount & Entity;
    },
  };
}
