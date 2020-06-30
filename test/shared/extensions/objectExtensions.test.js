'use strict';

const _expect = require('chai').expect
const objectExtensions = require('../../../domains/shared/extensions/objectExtensions');

describe('ObjectExtensions', function () {
    describe('isString', function() {
        it('should be true for string data types', function () {
            _expect("foo".isString()).to.eq(true);
        });
        it('should be false for non-string data types', function () {
            const num = 2;

            _expect(num.isString()).to.eq(false);
            _expect(true.isString()).to.eq(false);
            _expect({}.isString()).to.eq(false);
            _expect([].isString()).to.eq(false);
        });
    });

    describe('isNumber', function() {
        it('should be true for number data types', function () {
            const int = 2;
            const dec = 2.2;
            const exp1 = 123e5;
            const exp3 = 123e-5

            _expect(int.isNumber()).to.eq(true);
            _expect(dec.isNumber()).to.eq(true);
            _expect(exp1.isNumber()).to.eq(true);
            _expect(exp3.isNumber()).to.eq(true);
    
        });
        it('should be false for non-number data types', function () {
            _expect("2".isNumber()).to.eq(false);
            _expect(true.isNumber()).to.eq(false);
            _expect({}.isNumber()).to.eq(false);
            _expect([].isNumber()).to.eq(false);
        });
    });

    describe('isBoolean', function() {
        it('should be true for number data types', function () {
            _expect(false.isBoolean()).to.eq(true);
        });
        it('should be false for non-boolean data types', function () {
            const num = 2;

            _expect("2".isBoolean()).to.eq(false);
            _expect(num.isBoolean()).to.eq(false);
            _expect({}.isBoolean()).to.eq(false);
            _expect([].isBoolean()).to.eq(false);
        });
    });

    describe('isArray', function() {
        it('should be true for array data types', function () {
            _expect([].isArray()).to.eq(true);
        });
        it('should be false for non-array data types', function () {
            const num = 2;

            _expect("2".isArray()).to.eq(false);
            _expect(num.isArray()).to.eq(false);
            _expect({}.isArray()).to.eq(false);
            _expect(true.isArray()).to.eq(false);
        });
    });

    describe('isObject', function() {
        it('should be true for object data types', function () {
            _expect({}.isObject()).to.eq(true);
        });
        it('should be false for non-object data types', function () {
            const num = 2;

            _expect("2".isObject()).to.eq(false);
            _expect(num.isObject()).to.eq(false);
            _expect(true.isObject()).to.eq(false);
            _expect([].isObject()).to.eq(false);
        });
    });
});