'use strict';

Object.prototype.isNumber = function() {
    return typeof this === 'number';
}

Object.prototype.isString = function() {
    return typeof this === 'string';
}

Object.prototype.isBoolean = function() {
    return typeof this === 'boolean';
}

Object.prototype.isArray = function() {
    return Array.isArray(this);
}

Object.prototype.isObject = function() {
    let isObject = typeof this === 'object';

    // typeof returns true for objecrts and arrays
    // extra check that object is printed, and not array
    if (isObject) {
        isObject = this.toString().includes('object');
    }

    return isObject;
}