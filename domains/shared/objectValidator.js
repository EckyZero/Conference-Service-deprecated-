'use strict';

/**
 * Responsible for validating object types
 */
class ObjectValidator {
  /**
   * Checks to see if the passed in value is no-null and non-undefined
   * @param {any} val - any value
   * @return {boolean} - indicator on if the object exists
   */
  isValid(val) {
    return (val !== undefined && val !== null);
  }

  /**
   * Checks to see if the passed in value is number
   * @param {any} val - any value
   * @return {boolean} - indicator on if the value is a number
   */
  isNumber(val) {
    return this.isValid(val) && typeof val === 'number';
  }

  /**
   * Checks to see if the passed in value is a string
   * @param {any} val - any value
   * @return {boolean} - indicator on if the value is a string
   */
  isString(val) {
    return this.isValid(val) && typeof val === 'string';
  }

  /**
   * Checks to see if the passed in value is a boolean
   * @param {any} val - any value
   * @return {boolean} - indicator on if the value is a boolean
   */
  isBoolean(val) {
    return this.isValid(val) && typeof val === 'boolean';
  }

  /**
   * Checks to see if the passed in value is an Array
   * @param {any} val - any value
   * @return {boolean} - indicator on if the value is an Array
   */
  isArray(val) {
    return this.isValid(val) && Array.isArray(val);
  }

  /**
   * Checks to see if the passed in value is an Object
   * @param {any} val - any value
   * @return {boolean} - indicator on if the value is an Object
   */
  isObject(val) {
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
