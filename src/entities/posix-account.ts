import type { Entity } from "./entity-factory";
import { createEditableProperty, createProperty } from "./factory-helpers";

interface PosixAccountMandatory {
  // "top", "person", "posixAccount"
  readonly objectClass: Array<string>;
  loginShell: "/bin/bash" | "/usr/bin/nologin";
}

interface CompletePosixAccount extends PosixAccountMandatory {
  readonly missingAttributes: undefined;
  // this is our internal id and primary key in database
  readonly id?: string;
  // dn: uid=uid,ou=users,o=[organization]
  readonly dn: string;
  // username
  uid: string;
  // uid
  uidNumber: number;
  gidNumber: number;
  // /home/<uid>
  homeDirectory: string;
  // cn and gecos share the same full name of user
  cn: string;
  readonly gecos: string;
  mail?: string;
}

interface IncompletePosixAccount extends PosixAccountMandatory {
  readonly missingAttributes: Array<string>;
  readonly id?: string;
  readonly dn: string | undefined;
  uid: string | undefined;
  uidNumber: string | undefined;
  gidNumber: string | undefined;
  readonly homeDirectory: string | undefined;
  cn: string | undefined;
  readonly gecos: string | undefined;
  mail?: string;
}

export type PosixAccount = CompletePosixAccount | IncompletePosixAccount;

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
    missingAttributes: createProperty(values, "missingAttributes", undefined, false),
    id: createProperty(values, "id", undefined, false),
    objectClass: createProperty(values, "objectClass", ["top", "person", "posixAccount"]),
    uid: createEditableProperty(values, "uid", "string"),
    uidNumber: createEditableProperty(values, "uidNumber", "number"),
    gidNumber: createEditableProperty(values, "gidNumber", "number"),
    loginShell: createEditableProperty(values, "loginShell", "string"),
    cn: createEditableProperty(values, "cn", "string"),
    gecos: createProperty(values, "cn"),
    mail: createEditableProperty(values, "mail", "string", true),
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
    homeDirectory: {
      get(): string | undefined {
        const uid = values.get("uid");

        return typeof uid === "string" ? `/home/${uid}` : undefined;
      },
      set() {
        throw new Error("home directory cannot be edited");
      },
    },
  });

  return o as PosixAccount & Entity;
}
