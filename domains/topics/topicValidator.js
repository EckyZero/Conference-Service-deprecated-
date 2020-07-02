'use strict';

const _validator = require('express-validator');

/**
 * Responsible for validating topic queries
 */
class TopicValidator {
  /**
   * Validate TOPIC GET requets
   * @return {Array} - Array of validations
   */
  validateGet() {
    return [
      _validator.query('source', 'Valid values include web or cache').exists()];
  }
}

module.exports = TopicValidator;
