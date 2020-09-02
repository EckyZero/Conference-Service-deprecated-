'use strict';

const { v4: uuidv4 } = require('uuid');

/**
 * Foundational functionality for model objects
 */
class BaseModel {
  id;
  /**
   * Instantiate an instance of a model
   * @constructor
   */
  constructor() {
    this.id = uuidv4();
  }
}

module.exports = BaseModel;
