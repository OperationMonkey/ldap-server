import type { Database } from "../ports/database.port";

import type { Person } from "./person";

export interface Entity {
  save: () => Promise<void>;
  load: (id: string) => Promise<void>;
}

export interface EntityFactory {
  createPerson: () => Person & Entity;
}

/**
 *
 * @param values map of values for object properties
 * @param name name of the property we are creating
 * @returns PropertyDescriptor for the object
 */
function createProperty(values: Map<string, string | number>, name: string): PropertyDescriptor {
  return {
    get(): string | number | undefined {
      return values.get(name);
    },
    set(value: string | number): void {
      values.set(name, value);
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
        username: createProperty(values, "username"),
        password: createProperty(values, "password"),
        realname: createProperty(values, "realname"),
      });

      return o as Person & Entity;
    },
  };
}
