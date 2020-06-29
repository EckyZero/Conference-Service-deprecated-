'use strict';

const _express          = require('express');
const _path             = require('path');
const _cookieParser     = require('cookie-parser');
const talkController    = require('./domains/talks/talkController');
const topicController   = require('./domains/topics/topicController');

const _app = _express();



_app.use(_express.json());
_app.use(_express.urlencoded({ extended: false }));
_app.use(_cookieParser());
_app.use(_express.static(_path.join(__dirname, 'public')));

_app.use('/topics', topicController);
_app.use('/talks', talkController);

module.exports = _app;
