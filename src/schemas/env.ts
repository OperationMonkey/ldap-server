import * as z from "zod";

export const envSchema = z.object({
  httpPort: z.coerce.number().default(3000),
  ldapPort: z.coerce.number().default(389),
  databaseType: z.enum(["memory"]),
  logger: z.enum(["console"]).default("console"),
});

export type Env = z.infer<typeof envSchema>;
