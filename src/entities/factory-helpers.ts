const MISSING_ATTRIBUTES_KEY = "missingAttributes";

function addMissingAttribute(values: Map<string, unknown>, attr: string): void {
  const arr = values.get(MISSING_ATTRIBUTES_KEY);

  if (arr && Array.isArray(arr)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newArr = [...new Set([...arr, attr])];

    values.set(MISSING_ATTRIBUTES_KEY, newArr);
  } else {
    values.set(MISSING_ATTRIBUTES_KEY, [attr]);
  }
}

function removeMissingAttribute(values: Map<string, unknown>, attr: string): void {
  const arr = values.get(MISSING_ATTRIBUTES_KEY);

  const newArr = arr && Array.isArray(arr) ? arr.filter((i) => i !== attr) : undefined;

  if (newArr?.length && newArr.length > 0) {
    values.set(MISSING_ATTRIBUTES_KEY, newArr);
  } else {
    values.delete(MISSING_ATTRIBUTES_KEY);
  }
}

export function createEditableProperty(
  values: Map<string, string | number | Array<string>>,
  name: string,
  type: "string" | "number",
  optional: boolean = false
): PropertyDescriptor {
  if (!optional) {
    addMissingAttribute(values, name);
  }

  return {
    get(): string | number | Array<string> | undefined {
      return values.get(name);
    },
    set(value: string | number): void {
      if (typeof value === type) {
        values.set(name, value);
        removeMissingAttribute(values, name);
      } else {
        throw new Error("Type mismatch");
      }
    },
    enumerable: true,
    configurable: false,
  };
}

export function createProperty(
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
