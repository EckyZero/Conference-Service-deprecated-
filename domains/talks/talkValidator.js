const _validator = require('express-validator');
// TODO: Add localization?
/**
 * Responsible for validating talk queries
 */
class TalkValidator {
  /**
   * Validate TALK GET requests
   * @return {Array} - Array of validations
   */
  validateGet() {
    return [
      _validator.query('source', 'Valid values include web or cache').exists(),
      _validator.query('limit').optional().isInt(),
      _validator.query('orderBy').optional().isIn(['talkCount', 'title']),
      _validator.query('topic').optional()];
  }
}

module.exports = TalkValidator;
