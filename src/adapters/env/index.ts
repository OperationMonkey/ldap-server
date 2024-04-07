import { envSchema, type Env } from "../../schemas/env";
import { snakeObjToCamel } from "../../utils";

const envData = envSchema.parse(snakeObjToCamel(process.env));

export const env = (function createEnv(): Env {
  const e = {};

  Object.entries(envData).forEach(([key, value]) => {
    Object.defineProperty(e, key, {
      value,
      enumerable: true,
      writable: false,
    });
  });

  return e as Env;
})();
