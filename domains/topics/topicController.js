'use strict';

const _validator = require('express-validator');
const ServiceResponse = require('../shared/serviceResponse');

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
    this.logger = opts.logger;
  }

  /**
   * Get Topics
   * @param {object} req - the http request object
   * @param {object} res - the http response object
   */
  async get(req, res) {
    const errors = _validator.validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({errors: errors.array()});
      return;
    }

    const {source} = req.query;

    try {
      const topics = await this.topicService.getAllTopics(source);

      const response = new ServiceResponse();

      response.isError = false;
      response.count = topics.length;
      response.results = topics;

      res.status(200).send(response);
    } catch (e) {
      this.logger.warn(e, 'GET /topics failed');
      const response = new ServiceResponse();

      response.isError = true;
      response.errorMessage = `Request completed with error: ${e.message}`;
      response.count = 0;
      response.results = [];

      res.status(500).send(response);
      return;
    }
  }

  /**
   * Sync data from the website to the app's database
   * @param {object} req - the http request object
   * @param {object} res - the http response object
   */
  async post(req, res) {
    try {
      await this.topicService.sync();
      res.status(201).send();
    } catch (e) {
      this.logger.warn(e, 'POST /topics failed');
      const response = new ServiceResponse();
      
      response.isError = true;
      response.errorMessage = `Request completed with error: ${e.message}`;

      res.status(500).send(response);
    }
  }
}

module.exports = TopicController;
