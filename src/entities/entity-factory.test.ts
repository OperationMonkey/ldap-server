import assert from "node:assert";
import { describe, it } from "node:test";

import type { Database } from "../ports/database.port";

import { createEntityFactory } from "./entity-factory";

export const name = "Entity factory";

void describe("Entity factory", undefined, () => {
  const factory = createEntityFactory({} as Database);

  void describe("Factory buildline", undefined, () => {
    void it("should throw on type mismatch", () => {
      const account = factory.createPosixAccount();

      assert.throws(() => (account.cn = 123 as unknown as string));
      assert.throws(() => (account.uidNumber = "1" as unknown as number));
    });
  });

  void describe("Posic Accounts", undefined, () => {
    void it("should create posix account", () => {
      const account = factory.createPosixAccount();

      account.cn = "John Doe";

      assert.equal(account.cn, "John Doe");
    });

    void it("should have correct object classes", () => {
      const account = factory.createPosixAccount();

      assert.deepEqual(account.objectClass, ["top", "person", "posixAccount"]);
    });

    void it("should update gecos with cn", () => {
      const account = factory.createPosixAccount();

      assert.equal(account.cn, account.gecos);
      assert.equal(account.cn, undefined);

      account.cn = "Jane Doe";
      assert.equal(account.cn, account.gecos);
      assert.equal(account.cn, "Jane Doe");
    });

    void it("should update dn with uid", () => {
      const account = factory.createPosixAccount();

      account.uid = "john";
      assert.equal(account.dn, "uid=john,ou=users,o=[organization]");
      account.uid = "jane";
      assert.equal(account.dn, "uid=jane,ou=users,o=[organization]");
    });
  });
});
