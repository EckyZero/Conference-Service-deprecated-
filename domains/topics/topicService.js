'use strict';

const CONSTANTS = require('../../configs/constants.json');

/**
 * Responsible for core business logic relating to Topics
 */
class TopicService {
  /**
  * Represents a TopicService object
  * @constructor
  * @param {object} opts - IoC object holding dependencies
  */
  constructor(opts) {
    this.topicScraper = opts.topicScraper;
    this.topicDatabase = opts.topicDatabase;
    this.logger = opts.logger;
  }

  /**
   * Get all Topics from the source
   * @param {string} source - source to query for topics (web or cache)
   * @return {Array} - a list of Topics
   */
  async getAllTopics(source) {
    let topics;

    switch (source) {
      case CONSTANTS.SOURCE.WEB:
        topics = await this.topicScraper.getAllTopics();
        break;
      case CONSTANTS.SOURCE.CACHE:
        topics = await this.topicDatabase.getAllTopics();
        break;
      default:
        topics = await this.topicScraper.getAllTopics();
        break;
    }
    return topics;
  };

  /**
   * Sync topics from the web to the database
   */
  async syncAllTopics() {
    try {
      // Get latest topics from the web
      const topics = await this.topicScraper.getAllTopics();
      // Ensure table is created
      await this.topicDatabase.ensureTableExists();
      // insert new topics,
      // only adding if records matching the tag don't already exist
      await this.topicDatabase.upsertAll(topics, 'tag');
    } catch (error) {
      this.logger(err);
      throw err;
    }
  }
}

module.exports = TopicService;
