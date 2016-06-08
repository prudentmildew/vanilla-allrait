import Controller from './Controller';
import Storage from './Storage';
import Router from './Router';
import ModelManager from './models/ModelManager';

export default class App {

  constructor(element, name) {
    this.name = name;
    this.container = element;
    this.storage = new Storage(this.name);
    this.modelManager = new ModelManager(this.storage);
    this.controller = new Controller(this);
    this.router = new Router(this.controller);
  }

}
