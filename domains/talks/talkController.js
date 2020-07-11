'use strict';

const _validator = require('express-validator');
const ServiceResponse = require('../shared/serviceResponse');

/**
 * Responsible for validating Talk request inputs and formatting responses
 */
class TalkController {
  /**
   * Represents a TalkController object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.talkService = opts.talkService;
    this.objectValidator = opts.objectValidator;
    this.logger = opts.logger;
  }

  /**
   * Get Talks
   * @param {object} req - the http request object
   * @param {object} res - the http response object
   */
  async get(req, res) {
    const errors = _validator.validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({errors: errors.array()});
      return;
    }

    const {source, topic} = req.query;
    let topics = [];

    // Support for multiple topics
    if (this.objectValidator.isArray(topic)) {
      topics = topic;
    } else if (this.objectValidator.isString(topic)) {
      topics.push(topic);
    }

    try {
      const talks = await this.talkService.getTalks(source, topics);
      const response = new ServiceResponse();

      response.isError = false;
      response.count = talks.length;
      response.results = talks;

      res.status(200).send(response);

      return;
    } catch (e) {
      this.logger.warn(e, '/talks failed');
      const response = new ServiceResponse();

      response.isError = true;
      response.error = `Request completed with error: ${e.message}`;
      response.count = 0;
      response.results = [];

      res.status(500).send(response);
      return;
    }
  }
}

module.exports = TalkController;
