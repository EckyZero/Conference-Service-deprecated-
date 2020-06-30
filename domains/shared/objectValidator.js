'use strict';

class ObjectValidator {
    constructor(opts) {

    }

    isValid (val) {
        return (val !== undefined && val !== null);
    }

    isNumber (val) {
        return this.isValid(val) && typeof val === 'number';
    }
    
    isString (val) {
        return this.isValid(val) && typeof val === 'string';
    }
    
    isBoolean (val) {
        return this.isValid(val) && typeof val === 'boolean';
    }
    
    isArray (val) {
        return this.isValid(val) && Array.isArray(val);
    }
    
    isObject (val) {
        let isObject = this.isValid(val) && typeof val === 'object';
    
        // typeof returns true for objecrts and arrays
        // extra check that object is printed, and not array
        if (isObject) {
            isObject = val.toString().includes('object');
        }
    
        return isObject;
    }
}

module.exports = ObjectValidator;