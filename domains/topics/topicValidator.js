const _expressValidator = require('express-validator');

// TODO: Make compliant with new ESLint
class TopicValidator {

  validateGet() {
    return [
      _expressValidator.query('source', 'missing valid values. Use "web" to fetch the latest data (but may be slow), or "cache" for fast data, but may be a few days old').exists(),
      _expressValidator.query('limit').optional().isInt(),
      _expressValidator.query('orderBy').optional().isIn(['talkCount', 'title'])
    ]
  }
}

module.exports = TopicValidator;