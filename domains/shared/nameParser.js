'use strict';

/**
 * Responsible for parsing name elements
 */
class NameParser {
  /**
   * Represents a NameParser object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.objectValidator = opts.objectValidator;
  }

  /**
   * Parse the first name from a full name
   * @param {string} fullName - first/middle/last name of an individual
   * @return {string} - first name of the full name
   */
  parseFirstName(fullName) {
    if (!this.objectValidator.isString(fullName)) return null;

    const names = fullName.split(' ');

    const firstName = this.trimName(names[0]);

    return firstName;
  }

  /**
   * Parse the middle name from a full name
   * @param {string} fullName - first/middle/last name of an individual
   * @return {string} - middle name of the full name
   */
  parseMiddleName(fullName) {
    if (!this.objectValidator.isString(fullName)) return null;

    const names = fullName.split(' ');

    if (names.length < 1) return null;

    const middleName = this.trimName(names[1]);

    return middleName;
  }

  /**
   * Parse the last name from a full name
   * @param {string} fullName - first/middle/last name of an individual
   * @return {string} - last name of the full name
   */
  parseLastName(fullName) {
    if (!this.objectValidator.isString(fullName)) return null;

    const names = fullName.split(' ');

    if (names.length < 2) return null;

    const lastName = this.trimName(names[2]);

    return lastName;
  }

  /**
   * Removes any annotations in the name (ex: .)
   * @param {string} name - name to trim
   * @return {string} - the name with annotations removed
   */
  trimName(name) {
    if (!this.objectValidator.isString(name)) return null;

    const trimmedName = name.replace(/\./g, '').trim();

    return trimmedName;
  }
}

module.exports = NameParser;
