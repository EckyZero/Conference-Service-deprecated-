'use strict';

const Person = require('../../persons/models/person');
const Calling = require('../../callings/models/calling');
const BaseModel = require('../../shared/baseModel');

/**
 * Speaker object (aka the person who gave a talk)
 */
class Speaker extends BaseModel {
  person;
  calling;

  /**
   * Initialize an instance of the Speaker object
   * @constructor
   */
  constructor() {
    super();
    this.person = new Person();
    this.calling = new Calling();
  }
}

module.exports = Speaker;
