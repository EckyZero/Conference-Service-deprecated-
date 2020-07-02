'use strict';

const _validator = require('express-validator');
const { nextTick } = require('async');

/**
 * Responsible for validating Talk request inputs and formatting responses
 */
class TalkController {
  /**
   * Represents a TalkController object
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.talkService = opts.talkService;
    this.objectValidator = opts.objectValidator;
  }

  /**
   * Get Talks
   * @param {object} req - the http request object
   * @param {object} res - the http response object
   */
  async get(req, res) {
    const errors = _validator.validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: consistent error message format
      res.status(400).json({errors: errors.array()});
      next();
    }

    // TODO: add support for limit, orderBy, the "DB" source
    // and merge, union, or distinct with topics
    const {source, topic} = req.query;
    let topics = [];

    if(this.objectValidator.isArray(topic)) {
      topics = topic;
    } else if (this.objectValidator.isString(topic)) {
      topics.push(topic);
    }

    try {
      // TODO: Wrap response in a consistent object
      const talks = await this.talkService.getTalks(source, topics);
      res.status(200).send(talks);
    } catch (e) {
      // TODO: Consistent error message format
      res.status(200).send(e.message);
    }
  }
}

module.exports = TalkController;
