'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: "talk-service"});

module.exports = logger;