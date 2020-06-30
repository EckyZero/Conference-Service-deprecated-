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

Object.prototype.isUndefined = function() {
    return typeof this === undefined;
}

Object.prototype.isNullOrUndefined = function() {
    return typeof this === undefined || this === null;
}

Object.prototype.isArray = function() {
    return Array.isArray(this);
}

Object.prototype.isFunction = function() {
    return typeof this === 'function';
}

Object.prototype.isObject = function() {
    return typeof this === 'object';
}