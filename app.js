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

// Support warm up requests for reduced latency after deployment
_app.get('/_ah/warmup', (req, res) => res.status(200).send());

// Setup routes for other deployments
_app.use('/topics', topicRouter);
_app.use('/talks', talkRouter);
_app.use('/static', _express.static('public'));

module.exports = _app;
