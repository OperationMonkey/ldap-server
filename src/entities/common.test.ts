import assert from "node:assert";
import { describe, it } from "node:test";

import type { Database } from "../ports/database.port";

import { createEntityFactory } from "./common";

export const name = "Entities common";

void describe("Entities common", undefined, () => {
  void it("should create person", () => {
    const foo = createEntityFactory({} as Database);
    const person = foo.createPerson();

    person.username = "Foo";
    person.password = "Bar";
    person.realname = "Foo Bar";

    assert.equal(person.username, "Foo");
    assert.equal(person.password, "Bar");
    assert.equal(person.realname, "Foo Bar");
  });
});
