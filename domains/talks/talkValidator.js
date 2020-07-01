const _expressValidator = require('express-validator');

class TalkValidator {

    validateGet() {
        return [
            _expressValidator.query('source', 'missing valid values. Use "web" to fetch the latest data (but may be slow), or "cache" for fast data, but may be a few days old').exists(),
            _expressValidator.query('limit').optional().isInt(),
            _expressValidator.query('orderBy').optional().isIn(['talkCount', 'title']),
            _expressValidator.query('topic').optional()
        ]
    }
}

module.exports = TalkValidator;