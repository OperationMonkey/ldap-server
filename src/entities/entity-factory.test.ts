import assert from "node:assert";
import { describe, it } from "node:test";

import type { Database } from "../ports/database.port";

import { createEntityFactory } from "./entity-factory";

export const name = "Entity factory";

void describe("Entity factory", undefined, () => {
  void it("should create person", () => {
    const factory = createEntityFactory({} as Database);
    const person = factory.createPerson();

    person.username = "Foo";
    person.password = "Bar";
    person.realname = "Foo Bar";

    assert.equal(person.username, "Foo");
    assert.equal(person.password, "Bar");
    assert.equal(person.realname, "Foo Bar");
  });

  void it("should throw on type mismatch", () => {
    const factory = createEntityFactory({} as Database);
    const person = factory.createPerson();

    assert.throws(() => (person.realname = 123 as unknown as string));
    assert.throws(() => (person.age = "1" as unknown as number));
  });
});
