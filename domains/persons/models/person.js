'use strict';

const BaseModel = require('../../shared/baseModel');

/**
 * Person object (aka the person who gave a talk)
 */
class Person extends BaseModel {
  preferredName;
  firstName;
  middleName;
  lastName;

  /**
   * Initialize an instance of a person
   * @constructor
   */
  constructor() {
    super();
  }
}

module.exports = Person;
