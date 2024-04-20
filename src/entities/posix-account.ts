export interface PosixAccount {
  // this is our internal id and primary key in database
  id: string;
  // "top", "person", "posixAccount"
  objectClass: Array<string>;
  // dn: uid=uid,ou=users,o=[organization]
  dn: string;
  // username
  uid: string;
  // uid
  uidNumber: number;
  gidNumber: number;
  // /home/<uid>
  homeDirectory: string;
  loginShell: "/bin/bash" | "/usr/sbin/nologin";
  // cn and gecos share the same full name of user
  cn: string;
  gecos: string;
  mail?: string;
}
