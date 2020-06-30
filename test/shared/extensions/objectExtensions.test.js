'use strict';

const _mocha = require('mocha');
const _expect = require('chai').expect
const _sinon = require('sinon');
const objectExtensions = require('../../../domains/shared/extensions/objectExtensions');
const { assert } = require('chai');

describe('isString', function() {
    it('should be true for string data types', function () {
        _expect("foo".isString()).to.eq(true);
    });
    it('should be false for non-string data types', function () {
        const num = 2;

        _expect(num.isString()).to.eq(false);   // correct for numbers
        _expect(true.isString()).to.eq(false);  // correct for booleans
        _expect({}.isString()).to.eq(false);    // correct for objects
        _expect([].isString()).to.eq(false);    // correct for arrays
    });
});

describe('isNumber', function() {
    it('should be true for number data types', function () {
        const int = 2;
        const dec = 2.2;
        const exp1 = 123e5;
        const exp3 = 123e-5
        
        _expect(int.isNumber()).to.eq(true);   // correct for numbers
        _expect(dec.isNumber()).to.eq(true);   // correct for numbers
        _expect(exp1.isNumber()).to.eq(true);   // correct for numbers
        _expect(exp3.isNumber()).to.eq(true);   // correct for numbers
  
    });
    it('should be false for non-number data types', function () {
        _expect("2".isNumber()).to.eq(false);   // correct for numbers
        _expect(true.isNumber()).to.eq(false);  // correct for booleans
        _expect({}.isNumber()).to.eq(false);    // correct for objects
        _expect([].isNumber()).to.eq(false);    // correct for arrays
    });
});