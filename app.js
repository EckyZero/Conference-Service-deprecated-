'use strict';

const _express = require('express');
const _path = require('path');
const _cookieParser = require('cookie-parser');
const _database = require('./domains/shared/database');
const talkRouter = require('./domains/talks/talkRouter');
const topicRouter = require('./domains/topics/topicRouter');

const _app = _express();

_app.use(_express.json());
_app.use(_express.urlencoded({extended: false}));
_app.use(_cookieParser());
_app.use(_express.static(_path.join(__dirname, 'public')));

_app.use('/1.0.0/topics', topicRouter);
_app.use('/1.0.0/talks', talkRouter);
_app.use('/privacy', _express.static('public/privacy'));

module.exports = _app;
