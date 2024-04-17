import type { Database } from "../ports/database.port";

import type { Person } from "./person";

export interface Entity {
  save: () => Promise<void>;
  load: (id: string) => Promise<void>;
}

type CreatePerson = () => Person & Entity;

export interface EntityFactory {
  createPerson: CreatePerson;
}

function createProperty(
  values: Map<string, string | number>,
  name: string,
  type: "string" | "number"
): PropertyDescriptor {
  return {
    get(): string | number | undefined {
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

export function createEntityFactory(_database: Database): EntityFactory {
  return {
    createPerson(): Person & Entity {
      const values = new Map<string, string | number>();

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
        username: createProperty(values, "username", "string"),
        password: createProperty(values, "password", "string"),
        realname: createProperty(values, "realname", "string"),
        age: createProperty(values, "age", "number"),
      });

      return o as Person & Entity;
    },
  };
}
