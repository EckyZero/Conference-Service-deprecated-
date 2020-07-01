'use strict';

// TODO: Get name from a config file
const _bunyan = require('bunyan');
const _logger = _bunyan.createLogger({name: 'talk-service'});

/**
 * Responsible for Logging
 */
class Logger {
  /**
   * Log an exception
   * @param {Exception} exception - exception to log
   * @param {string} message - custom message describing the exception
   */
  info(exception, message) {
    _logger.info(exception, message);
  }
}

module.exports = Logger;
