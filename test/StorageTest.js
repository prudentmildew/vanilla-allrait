import Storage from '../src/Storage';
import {expect} from 'chai';

describe('Storage', function () {

  const name = 'teststorage';
  const testStorage = new Storage(name);
  const testData = {foo: 'bar', gnu: [1, 2, 3]};

  it('should be an instance of Storage', function () {

    expect(testStorage).to.be.instanceof(Storage);
    expect(testStorage.name).to.equal('teststorage');

  });

  it('should have a static init() function', function () {

    expect(Storage.hasOwnProperty('init')).to.be.true;
    expect(testStorage.hasOwnProperty('init')).to.be.false;


  });

  describe('set()', function () {

    it('should write data to the storage', function () {

      testStorage.set(testData);

      expect(JSON.parse(localStorage.getItem(name)))
        .to.deep.equal(testData);

    });

  });

  describe('get()', function () {

    it('should return the expected data', function () {

      localStorage.setItem(name, JSON.stringify(testData));
      expect(testStorage.get()).to.deep.equal(testData);

    });

  });

});