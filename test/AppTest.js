import App from '../src/App';
import Storage from '../src/Storage';
import {expect} from 'chai';
import ModelManager from "../src/models/ModelManager";
import Controller from "../src/Controller";
import Router from "../src/Router";

describe('App', function () {

  const element = document.getElementById('testapp');
  const app = new App(element, 'testapp');

  it('should have the correct name...', function () {
    expect(app.name).to.equal('testapp');
  });

  it('... a container...', function () {
    expect(app.container).to.equal(element);
  });

  it('... a storage...', function () {
    expect(app.storage).to.be.instanceof(Storage);
  });

  it('... a model manager...', function () {
    expect(app.modelManager).to.be.instanceof(ModelManager);
  });

  it('... a controller...', function () {
    expect(app.controller).to.be.instanceof(Controller);
    expect(app.router).to.be.instanceof(Router);
  });

  it('... and a router...', function () {
    expect(app.router).to.be.instanceof(Router);
  });

});