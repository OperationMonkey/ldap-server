export interface PosixGroup {
  // internal primary key to identify group
  id: string;
  // "posixGroup"
  objectClass: Array<string>;
  // dn: cn=<cn>,ou=groups,o=[organization]
  dn: string;
  cn: string;
  gidNumber: number;
  description: string;
}
