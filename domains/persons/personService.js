'use strict';

const CONSTANTS = require('../../configs/constants.json');
const BaseService = require('../shared/baseService');

/**
 * Responsible for core business logic relating to Speakers
 */
class PersonService extends BaseService {
  /**
  * Represents a PersonService object
  * @constructor
  * @param {object} opts - IoC object holding dependencies
  */
  constructor(opts) {
    super(opts);
    this.personDatabase = opts.personDatabase;
    this.logger = opts.logger;
  }

  /**
   * Sync persons from the web to the database
   */
  async sync(persons) {
    try {
      // Ensure table is created
      await this.personDatabase.ensureTableExists();
      await this.personDatabase.insertAllIfNotFound(topics, 'preferred_name');
    } catch (error) {
      this.logger(err);
      throw err;
    }
  }
}

module.exports = PersonService;
