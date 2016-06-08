import ModelManager from '../src/models/ModelManager';
import Storage from '../src/Storage';
import {expect} from 'chai';

describe('ModelManager', function(){

  const storage = new Storage('test');
  const modelManager = new ModelManager(storage);

  it('should have the property: storage', function(){
    expect(modelManager.storage).to.be.instanceof(Storage);
  });

  describe('persist()', function(){

    it('should write object to storage');

  });

  describe('update()', function(){

    it('should update object in storage');

  });

  describe('find()', function(){

    it('should find one object from storage');

  });

  describe('findAll()', function(){

    it('should find all objects of class from storage');

  });

  describe('findAllByParent()', function(){

    it('should find all child objects in storage');

  });

  describe('remove()', function(){

    it('should remove object from storage');

  });

  describe('removeByParentId()', function(){

    it('should remove all child objects from storage');

  });

  describe('hydrate()', function(){

    it('should create object of specific class from generic Object');

  });

});