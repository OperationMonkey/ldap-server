import ldap from "ldapjs";

import { env } from "./adapters/env";
import { logger } from "./adapters/logger";

const server = ldap.createServer();

server.listen(env.ldapPort, () => {
  logger.debug(`LDAP server up at: ${server.url}`);
});
