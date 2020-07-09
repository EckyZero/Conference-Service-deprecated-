'use strict';

const _validator = require('express-validator');

/**
 * Resonsible for validating Topic request inputs and formatting responses
 */
class TopicController {
  /**
   * Represents a TopicController object
   * @constructor
   * @param {*} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.topicService = opts.topicService;
  }

  /**
   * Get Topics
   * @param {*} req - the http request object
   * @param {*} res - the http response object
   */
  async get(req, res) {
    const errors = _validator.validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: Consistent error message format
      res.status(400).json({errors: errors.array()});
      return;
    }

    const {source} = req.query;

    try {
      // TODO: Wrap response in a consistent object
      const topics = await this.topicService.getAllTopics(source);
      res.status(200).send(topics);
    } catch (e) {
      // TODO: Consistent error message format
      res.status(200).send(e.message);
      return;
    }
  }
}

module.exports = TopicController;
