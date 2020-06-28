'use strict';

const _express       = require('express');
const _path          = require('path');
const _cookieParser  = require('cookie-parser');
const _talkService   = require('./domains/talks/talkService');
const IocConstructor = require('./domains/shared/iocConstructor');

const _app = _express();
const _ioc = new IocConstructor();
const _container = _ioc.initialize();

_app.use(_express.json());
_app.use(_express.urlencoded({ extended: false }));
_app.use(_cookieParser());
_app.use(_express.static(_path.join(__dirname, 'public')));

_app.get('/', async (req,res) => {
    const results = await _talkService.getTalks();
    await _container.resolve('talkService');
    return res.status(200).send(results);
});

module.exports = _app;
