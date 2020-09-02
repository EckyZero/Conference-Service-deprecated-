'use strict';

const CONSTANTS = require('../../configs/constants.json');
const BaseService = require('../shared/baseService');

/**
 * Responsible for core business logic relating to Speakers
 */
class SpeakerService extends BaseService {
  /**
  * Represents a SpeakerService object
  * @constructor
  * @param {object} opts - IoC object holding dependencies
  */
  constructor(opts) {
    super(opts);
    this.callingService = opts.callingService;
    this.personService = opts.personService;
    this.speakerDatabase = opts.speakerDatabase;
    this.logger = opts.logger;
  }

  /**
   * Sync speaker objects to the database
   * @param {Array} speakers - Array of speakers to persist
   */
  async sync(speakers) {
    const callings = speakers.maps((speaker) => speaker.calling);
    const persons = speakers.maps((speaker) => speaker.person);

    try {
      // Ensure dependencies are synced
      await this.callingService.sync(callings);
      await this.personService.sync(persons);

      // Ensure table is created
      await this.speakerDatabase.ensureTableExists();
      await this.speakerDatabase.insertAllIfNotFound(speakers);
    } catch (error) {
      this.logger(err);
      throw err;
    }
  }
}

module.exports = SpeakerService;
