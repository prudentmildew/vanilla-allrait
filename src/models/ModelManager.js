export default class ModelManager {

  constructor(storage) {
    this.storage = storage;
  }

  persist(o) {
    const className = o.constructor.name;
    const nodeName = `${className.toLowerCase()}s`;
    const store = this.storage.get();
    store[nodeName].push(o);
    this.storage.set(store);
  }

  update(o) {
    const className = o.constructor.name;
    const nodeName = `${className.toLowerCase()}s`;
    const store = this.storage.get();
    store[nodeName].forEach(n => {
      if (n.id === o.id) {
        for (let key in o) {
          //noinspection JSUnfilteredForInLoop
          n[key] = o[key];
        }
      }
    });
    this.storage.set(store);
  }

  find(c, id) {
    const store = this.storage.get();
    const nodeName = `${c.name.toLowerCase()}s`;
    const coll = store[nodeName].filter(o => {
      return o.id === id;
    });
    return this.hydrate(coll[0], c) || null;
  }

  findAll(c) {
    const store = this.storage.get();
    const nodeName = `${c.name.toLowerCase()}s`;
    return store[nodeName].map(item => {
      return this.hydrate(item, c);
    });
  }

  findAllByParent(c, parentId) {
    const store = this.storage.get();
    const nodeName = `${c.name.toLowerCase()}s`;
    const items = store[nodeName].filter(o => {
      return o.parentId === parentId;
    });

    return items.map(item => {
      return this.hydrate(item, c);
    });

  }

  remove(c, id) {
    const nodeName = `${c.name.toLowerCase()}s`;
    const store = this.storage.get();

    for (let i = 0; i < store[nodeName].length; i++) {
      if (store[nodeName][i].id === id) {
        store[nodeName].splice(i, 1);
        break;
      }
    }

    this.storage.set(store);

  }

  removeByParentId(c, parentId) {
    const nodeName = `${c.name.toLowerCase()}s`;
    const store = this.storage.get();

    store[nodeName] = store[nodeName].filter(o => {
      return o.parentId !== parentId;
    });

    this.storage.set(store);
  }

  hydrate(o, targetClass) {
    const c = new targetClass();
    Object.keys(c).map(k => {
      if (o[k]) {
        c[k] = o[k];
      }
    });
    return c;
  }

}
