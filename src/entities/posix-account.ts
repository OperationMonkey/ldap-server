import type { Entity } from "./entity-factory";
import { createEditableProperty, createProperty } from "./factory-helpers";

export interface PosixAccount {
  // this is our internal id and primary key in database
  id: string;
  // "top", "person", "posixAccount"
  objectClass: Array<string>;
  // dn: uid=uid,ou=users,o=[organization]
  dn: string;
  // username
  uid: string;
  // uid
  uidNumber: number;
  gidNumber: number;
  // /home/<uid>
  homeDirectory: string;
  loginShell: "/bin/bash" | "/usr/sbin/nologin";
  // cn and gecos share the same full name of user
  cn: string;
  gecos: string;
  mail?: string;
}

export function createPosixAccount(): PosixAccount & Entity {
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
}
