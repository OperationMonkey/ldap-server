import assert from "node:assert";
import { describe, it } from "node:test";

import { createPosixAccount } from "./posix-account";

export const name = "Posix Accounts";

void describe("Posic Accounts", undefined, () => {
  void it("should create posix account", () => {
    const account = createPosixAccount();

    account.cn = "John Doe";

    assert.equal(account.cn, "John Doe");
  });

  void it("should have correct object classes", () => {
    const account = createPosixAccount();

    assert.deepEqual(account.objectClass, ["top", "person", "posixAccount"]);
  });

  void it("should update gecos with cn", () => {
    const account = createPosixAccount();

    assert.equal(account.cn, account.gecos);
    assert.equal(account.cn, undefined);

    account.cn = "Jane Doe";
    assert.equal(account.cn, account.gecos);
    assert.equal(account.cn, "Jane Doe");
  });

  void it("should update dn with uid", () => {
    const account = createPosixAccount();

    account.uid = "john";
    assert.equal(account.dn, "uid=john,ou=users,o=[organization]");
    account.uid = "jane";
    assert.equal(account.dn, "uid=jane,ou=users,o=[organization]");
  });

  void it("should miss all editable properties", () => {
    const account = createPosixAccount();

    assert.deepStrictEqual(account.missingAttributes, [
      "uid",
      "uidNumber",
      "gidNumber",
      "loginShell",
      "cn",
    ]);
  });
});
