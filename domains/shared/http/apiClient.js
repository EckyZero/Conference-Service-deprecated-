'use strict';

const _needle = require('needle');
const HttpResponse = require('./models/httpResponse');

/**
 * Helper class for making HTTP requests
 */
class ApiClient {
  /**
   * Represents an ApiClient object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.logger = opts.logger;
    this.timer = opts.timer;
  }

  /**
   * Make an HTTP GET request
   * @param {string} url - URL to GET
   */
  async get(url) {
    const response = new HttpResponse();
    const startTime = this.timer.currentTime();

    try {
      const results = await _needle('get', url);

      response.isError = false;
      response.results = results ? results.body : body;
    } catch (e) {
      const message = `Http Error - GET - ${url}`;

      this.logger.info(e, message);

      response.isError = true;
      response.message = message;
      response.exception = e;
    } finally {
      const duration = this.timer.getMillisecondsSinceTime(startTime);
      this.logger.info(`Http - GET - ${url} completed in ${duration} ms`);
    }

    return response;
  }
}

module.exports = ApiClient;
