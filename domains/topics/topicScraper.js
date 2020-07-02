'use strict';

const _routes     = require(`../../configs/routes.json`); 
const BaseScraper = require('../shared/baseScraper');

const _topicsUrl  = _routes.BASE_URL + _routes.TOPIC_PATH;

/**
 * Responsible for retrieving and scraping html pages for topic data
 */
class TopicScraper extends BaseScraper {
  /**
   * Represents a TopicScraper object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.topicBuilder = opts.topicBuilder;
    this.objectValidator = opts.objectValidator;
  }

  /**
   * Scrape to get all topics
   * @return {Array} - a list of Topics
   */
  async getAllTopics() {
    const $ = await super.loadHtmlContentFromUrl(_topicsUrl);

    // TODO: better error handling
    if (!this.objectValidator.isValid($)) return null;

    let results = [];

    results = this.topicBuilder.buildMany($);

    return results;
  };
}

module.exports = TopicScraper;
