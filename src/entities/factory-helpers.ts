export function createEditableProperty(
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
