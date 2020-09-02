'use strict';

const BaseModel = require('../../shared/baseModel');

/**
 * General Conference Session Object
 */
class Session extends BaseModel {
  name;
  conferenceOrder;
  conference;

  /**
   * @constructor
   * Initialize an instance of a session
   */
  constructor() {
    super();
  }
}

module.exports = Session;
