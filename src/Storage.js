export default class Storage {

  constructor(name) {
    this.name = name;
    Storage.init(name);
  }

  static init(name, d) {
    if (!localStorage[name]) {
      const data = d || {lists: [], tasks: []};
      localStorage[name] = JSON.stringify(data);
    }
  }

  get() {
    return JSON.parse(localStorage.getItem(this.name));
  }

  set(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }


}
