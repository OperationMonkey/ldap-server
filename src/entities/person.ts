export interface Person {
  username: string;
  password: string;
  realname: string;
}

const props = new Map<string, string | number | undefined>();
const person = {};

Object.defineProperties(person, {
  id: {
    set() {
      throw new Error("Id cannot be set");
    },
    get() {
      return props.get("id");
    },
  },
  realname: {
    set(value: string) {
      props.set("realname", value);
    },
    get() {
      return props.get("realname");
    },
  },
});
