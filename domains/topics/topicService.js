'use strict';

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
  }

  /**
   * Get all Topics from the source
   * @param {string} source - source to query for topics (web or cache)
   * @return {Array} - a list of Topics
   */
  async getAllTopics(source) {
    // TODO: Add additional db source once ready (leverage source)
    // TODO: Move hard-coded strings to constants file
    const topics = topics = await this._getAllTopicsFromWeb();

    return topics;
  };

  /**
   * Get all topics from the web
   */
  async _getAllTopicsFromWeb() {
    const topics = await this.topicScraper.getAllTopics();
    return topics;
  }
}

module.exports = TopicService;
