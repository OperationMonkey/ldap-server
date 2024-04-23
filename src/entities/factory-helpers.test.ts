import assert from "node:assert";
import { describe, it } from "node:test";

import { createEditableProperty, createProperty } from "./factory-helpers";

export const name = "Entity factory helpers";

void describe("Entity factory helpers", undefined, () => {
  void it("should create editable property", () => {
    const values = new Map<string, string>();
    const obj = {} as { prop: string; prop2: number };

    Object.defineProperties(obj, {
      prop: createEditableProperty(values, "prop", "string"),
      prop2: createEditableProperty(values, "prop2", "number"),
    });

    assert.equal(obj.prop, undefined);
    assert.equal(obj.prop2, undefined);

    obj.prop = "value";
    obj.prop2 = 123;
    assert.equal(obj.prop, "value");
    assert.equal(obj.prop2, 123);
  });

  void it("should throw on type mismatch", () => {
    const values = new Map<string, string>();
    const obj = {} as { prop: number; prop2: string };

    Object.defineProperties(obj, {
      prop: createEditableProperty(values, "prop", "string"),
      prop2: createEditableProperty(values, "prop2", "number"),
    });

    assert.throws(() => (obj.prop = 123));
    assert.throws(() => (obj.prop2 = "value"));
  });

  void it("should create non-editable property", () => {
    const values = new Map<string, string>();
    const obj = {} as { prop: string };

    Object.defineProperties(obj, {
      prop: createProperty(values, "prop", "value2"),
    });

    assert.equal(obj.prop, "value2");
    assert.throws(() => (obj.prop = "value3"));
  });

  void it("should include created properties in stringify", () => {
    const values = new Map<string, string>();
    const obj = {} as { prop: string; prop2: string };

    Object.defineProperties(obj, {
      prop: createEditableProperty(values, "prop", "string"),
      prop2: createProperty(values, "prop2", "value2"),
    });

    obj.prop = "value";
    assert.equal(JSON.stringify({ prop: "value", prop2: "value2" }), JSON.stringify(obj));
  });

  void it("should not include non-enumerable values in stringify", () => {
    const values = new Map<string, string>();
    const obj = {} as { prop: string };

    Object.defineProperties(obj, {
      prop: createProperty(values, "prop", "value", false),
    });

    assert.equal(obj.prop, "value");
    assert.equal(JSON.stringify({}), JSON.stringify(obj));
  });

  void it("should add editable properties as missing", () => {
    const values = new Map<string, string>();
    const obj = {} as { prop: string };

    Object.defineProperties(obj, {
      prop: createEditableProperty(values, "prop", "string"),
    });

    assert.deepStrictEqual(values.get("missingAttributes"), ["prop"]);
  });

  void it("should have missingAttributes undefined, if all setters called", () => {
    const values = new Map<string, string>();
    const obj = {} as { prop: string };

    Object.defineProperties(obj, {
      prop: createEditableProperty(values, "prop", "string"),
    });

    obj.prop = "value";

    assert.strictEqual(values.get("missingAttributes"), undefined);
  });
});
