'use strict';

// TODO: Create public swagger
// TODO: Require API Keys

const _express = require('express');
const _path = require('path');
const _cookieParser = require('cookie-parser');
const talkRouter = require('./domains/talks/talkRouter');
const topicRouter = require('./domains/topics/topicRouter');

const _app = _express();

_app.use(_express.json());
_app.use(_express.urlencoded({extended: false}));
_app.use(_cookieParser());
_app.use(_express.static(_path.join(__dirname, 'public')));

_app.use('/topics', topicRouter);
_app.use('/talks', talkRouter);

module.exports = _app;
