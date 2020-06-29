'use strict';

const IocConstructor= require('../shared/iocConstructor');
const _express      = require('express');
const _constants    = require('../../configs/constants.json');

const _router  = _express.Router({mergeParams: true});

const _ioc = new IocConstructor();
const _container = _ioc.initialize();
const _talkService = _container.resolve(_constants.TALK_SERVICE);

_router.get('/', function(req, res) {

    let source = req.query ? req.query.source : 'db';

    const topics = _talkService.getAllTalks(source);

    res.status(200).send(topics);
});

_router.get('')

module.exports = _router;