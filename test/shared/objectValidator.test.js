'use strict';

const _mocha = require('mocha');
const _expect = require('chai').expect;
const ObjectValidator = require('../../domains/shared/objectValidator');

const _val = new ObjectValidator();

describe('ObjectValidator', function () {
    
    describe('isValid', function() {
        it('should be true for non-null or undefined values', function () {
            _expect(_val.isValid("foo")).to.eq(true);
            _expect(_val.isValid(2)).to.eq(true);
            _expect(_val.isValid(true)).to.eq(true);
            _expect(_val.isValid({})).to.eq(true);
            _expect(_val.isValid([])).to.eq(true);
        });
        it('should be false for null or undefined values', function () {
            _expect(_val.isValid(null)).to.eq(false);
            _expect(_val.isValid(undefined)).to.eq(false);
        });
    });
    
    describe('isString', function() {
        it('should be true for string data types', function () {
            _expect(_val.isString("foo")).to.eq(true);
        });
        it('should be false for non-string data types', function () {
            _expect(_val.isString(2)).to.eq(false);
            _expect(_val.isString(true)).to.eq(false);
            _expect(_val.isString({})).to.eq(false);
            _expect(_val.isString([])).to.eq(false);
            _expect(_val.isString(null)).to.eq(false);
            _expect(_val.isString(undefined)).to.eq(false);
        });
    });

    describe('isNumber', function() {
        it('should be true for number data types', function () {
            _expect(_val.isNumber(2)).to.eq(true);
            _expect(_val.isNumber(2.2)).to.eq(true);
            _expect(_val.isNumber(123e5)).to.eq(true);
            _expect(_val.isNumber(123e-5)).to.eq(true);
        });
        it('should be false for non-number data types', function () {
            _expect(_val.isNumber("2")).to.eq(false);
            _expect(_val.isNumber(true)).to.eq(false);
            _expect(_val.isNumber({})).to.eq(false);
            _expect(_val.isNumber([])).to.eq(false);
            _expect(_val.isNumber(null)).to.eq(false);
            _expect(_val.isNumber(undefined)).to.eq(false);
        });
    });

    describe('isBoolean', function() {
        it('should be true for number data types', function () {
            _expect(_val.isBoolean(false)).to.eq(true);
        });
        it('should be false for non-boolean data types', function () {
            _expect(_val.isBoolean("2")).to.eq(false);
            _expect(_val.isBoolean(2)).to.eq(false);
            _expect(_val.isBoolean({})).to.eq(false);
            _expect(_val.isBoolean([])).to.eq(false);
            _expect(_val.isBoolean(null)).to.eq(false);
            _expect(_val.isBoolean(undefined)).to.eq(false);
        });
    });

    describe('isArray', function() {
        it('should be true for array data types', function () {
            _expect(_val.isArray([])).to.eq(true);
        });
        it('should be false for non-array data types', function () {
            _expect(_val.isArray("2")).to.eq(false);
            _expect(_val.isArray(2)).to.eq(false);
            _expect(_val.isArray({})).to.eq(false);
            _expect(_val.isArray(true)).to.eq(false);
            _expect(_val.isArray(null)).to.eq(false);
            _expect(_val.isArray(undefined)).to.eq(false);
        });
    });

    describe('isObject', function() {
        it('should be true for object data types', function () {
            _expect(_val.isObject({})).to.eq(true);
        });
        it('should be false for non-object data types', function () {
            _expect(_val.isObject("2")).to.eq(false);
            _expect(_val.isObject(2)).to.eq(false);
            _expect(_val.isObject([])).to.eq(false);
            _expect(_val.isObject(true)).to.eq(false);
            _expect(_val.isObject(null)).to.eq(false);
            _expect(_val.isObject(undefined)).to.eq(false);
        });
    });
});