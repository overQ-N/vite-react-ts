import commonStore from "./commonStore";
const _store = {
  commonStore,
};
export type StoreType = typeof _store;

export default _store;

interface PersonStatic {}
class Person implements PersonStatic {
  static run = function () {};
}
// Person.run = function () {};
// Person.run
