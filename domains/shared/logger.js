'use strict';

const _bunyan = require('bunyan');
const _logger = _bunyan.createLogger({name: "talk-service"});

class Logger {
    constructor(opts) {

    }

    info (exception, message) {
        _logger.info(exception, message);
    }
}

module.exports = Logger;