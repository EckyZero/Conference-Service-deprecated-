'use strict';

const _validator = require('express-validator');

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
  }

  /**
   * Get Talks
   * @param {object} req - the http request object
   * @param {object} res - the http response object
   */
  async get(req, res) {
    const errors = _validator.validationResult(req);

    // TODO: only support 'GET' metthod - error if not
    if (!errors.isEmpty()) {
      // TODO: consistent error message format
      res.status(400).json({errors: errors.array()});
      return;
    }

    // TODO: add support for limit, orderBy, the "DB" source
    // and merge, union, or distinct with topics
    const {source, topic} = req.query;
    let topics = [];

    if (this.objectValidator.isArray(topic)) {
      topics = topic;
    } else if (this.objectValidator.isString(topic)) {
      topics.push(topic);
    }

    try {
      // TODO: Wrap response in a consistent object
      const talks = await this.talkService.getTalks(source, topics);
      res.status(200).send(talks);
      return;
    } catch (e) {
      // TODO: Consistent error message format
      res.status(200).send(e.message);
      return;
    }
  }
}

module.exports = TalkController;
