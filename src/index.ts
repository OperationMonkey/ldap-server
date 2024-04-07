import ldap from "ldapjs";

import { env } from "./adapters/env";

const server = ldap.createServer();

server.listen(env.ldapPort, () => {
  console.log("LDAP server up at: %s", server.url);
});
