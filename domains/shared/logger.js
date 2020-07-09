'use strict';

const _bunyan = require('bunyan');
const _constants = require('../../configs/constants.json');
const _logger = _bunyan.createLogger({name: _constants.APP_NAME});

/**
 * Responsible for Logging
 */
class Logger {
  /**
   * Log an exception (Info level)
   * @param {Exception} exception - exception to log
   * @param {string} message - custom message describing the exception
   */
  info(exception, message) {
    _logger.info(exception, message);
  }

  /**
   * Log a simple message (Info level)
   * @param {string} message - text of message to log
   */
  info(message) {
    _logger.info(message);
  }

  /**
   * Log an exception (Warn level)
   * @param {Exception} exception - exception to log
   * @param {string} message - custom message describing the exception
   */
  warn(exception, message) {
    _logger.warn(exception, message);
  }

  /**
   * Log a message (Warn level)
   * @param {string} message - custom message describing the exception
   */
  warn(message) {
    _logger.warn(message);
  }

  /**
   * Log an exception (Error level)
   * @param {Exception} exception - exception to log
   * @param {string} message - custom message describing the exception
   */
  error(exception, message) {
    _logger.error(exception, message);
  }

  /**
   * Log a message (Error level)
   * @param {string} message - custom message describing the exception
   */
  error(message) {
    _logger.error(message);
  }
}

module.exports = Logger;
