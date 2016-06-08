import {$trigger, $on, $ge, $gc, $gt, uuid} from '../src/helpers';
import {expect} from 'chai';

describe('helper functions', function () {

  describe('$trigger', function () {

    it('should trigger an event');

  });

  describe('$on', function () {
    it('should attach an event listener', function () {
      const elm = document.getElementById('test');
      let clicked = false;

      $on(elm, 'click', function () {
        clicked = true;
      });
      $trigger('click', elm);

      //noinspection BadExpressionStatementJS
      expect(clicked).to.be.true;

    });
  });

  describe('$ge', function () {

    it('should return the DOM element', function () {
      const id = 'testdiv';
      const actual = document.getElementById(id);
      expect(actual).to.equal($ge(id));
    });

  });

  describe('$gc', function () {

    it('should return a collection of elements', function () {
      const cn = 'testdivs';
      const actual = document.getElementsByClassName(cn);
      expect($gc(document, cn)).to.equal(actual);
    });

  });

  describe('$gt', function () {

    it('should return a collection of elements', function () {
      const tn = 'div';
      const actual = document.getElementsByTagName(tn);
      expect($gt(document, tn)).to.equal(actual);
    });

  });

  describe('uuid', function () {

    it('should return a valid uuid when called', function () {

      const actual = uuid();
      const expected = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f-0-9]{3}-[a-f0-9]{12}/i;

      expect(actual).to.match(expected);

    });

  });

});