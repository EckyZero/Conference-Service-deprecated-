'use strict';

const Talk = require('./models/talk');
const { Speaker } = require('./models/talk');

/**
 * Responsible for core business logic relating to Talks
 */
class TalkService {
  /**
   * Represents a TalkService object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.topicService = opts.topicService;
    this.talkScraper = opts.talkScraper;
    this.objectValidator = opts.objectValidator;
    this.logger = opts.logger;
  }

  /**
   * Get all talks given the source and topics of interest
   * @param {string} source - source to query data for (web/cache)
   * @param {Array} topics - string array of topics to search for
   * @return {Array} - Array of talks matching the query
   */
  async getTalks(source, topics) {
    let talks = [];

    if (this.objectValidator.isValid(topics) && topics.length > 0) {
      talks = await this.getTalksByTopics(topics);
    } else {
      talks = await this.getAllTalks(source);
    }
    return talks;
  };


  /**
   * Get all talks related to a single topic
   * @param {string} topic - string representing the topic of interest
   * @return {Talk} - Talks matching the specified topic
   */
  async getTalksByTopic(topic) {
    const talks = await this.talkScraper.getTalk(topic);
    return talks;
  }

  /**
   * Get all talks related to multiple topics
   * @param {Array} topics - string topics of interest
   * @return {Talk} - Talks matching the specified topics
   */
  async getTalksByTopics(topics) {
    let talks = [];

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const topicTalks = await this.getTalksByTopic(topic);
      if (this.objectValidator.isValid(topicTalks)) {
        talks = talks.concat(topicTalks);
      }
    }

    return talks;
  }

  /**
   * Get all Talks matching the source
   * @async
   * @param {string} source - source to query (web/cache)
   * @return {Array} - list of all talks from the source
   */
  async getAllTalks(source) {
    let talks = [];

    const topics = await this.topicService.getAllTopics(source);

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const topicTalks = await this.getTalksByTopic(topic.tag);
      if (this.objectValidator.isValid(topicTalks)) {
        talks = talks.concat(topicTalks);
      }
    }
    return talks;
  }

  /**
   * @async
   * Sync talks from the web to the database
   */
  async sync() {
    try {
      // Get latest topics from the web
      const talks = await this.getTalksByTopic('baptism');
      // const values = talks.map((talk) => talk.dataValues);
      // Save to the database
      await Talk.bulkCreate(talks, {
        ignoreDuplicates: true,
        include: [{
          association: Talk.Speaker,
          ignoreDuplicates: true,
        }],
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

module.exports = TalkService;
