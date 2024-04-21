import assert from "node:assert";
import { describe, it } from "node:test";

import type { Database } from "../ports/database.port";

import { createEntityFactory } from "./entity-factory";

export const name = "Entity factory";

void describe("Entity factory", undefined, () => {
  const factory = createEntityFactory({} as Database);

  void it("should be defined", () => {
    assert.ok(factory);
  });
});
