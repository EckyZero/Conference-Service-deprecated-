'use strict';

const CONSTANTS = require('../../configs/constants.json');
const BaseService = require('../shared/baseService');

/**
 * Responsible for core business logic relating to Speakers
 */
class CallingService extends BaseService {
  /**
  * Represents a CallingService object
  * @constructor
  * @param {object} opts - IoC object holding dependencies
  */
  constructor(opts) {
    super(opts);
    this.callingDatabase = opts.callingDatabase;
    this.logger = opts.logger;
  }

  /**
   * Sync callings from the web to the database
   */
  async sync(callings) {
    // try {
    //   // Ensure table is created
    //   await this.callingDatabase.ensureTableExists();
    //   await this.callingDatabase.insertAllIfNotFound(topics, 'role');
    // } catch (error) {
    //   this.logger(err);
    //   throw err;
    // }
  }
}

module.exports = CallingService;
