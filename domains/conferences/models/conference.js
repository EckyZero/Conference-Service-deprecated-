' use strict';

const BaseModel = require('../../shared/baseModel');

/**
 * General Conference Object
 */
class Conference extends BaseModel {
  year;
  month;

  /**
   * Initialize a Conference object
   * @constructor
   */
  constructor() {
    super();
  }
}

module.exports = Conference;
