'use strict';

const IocConstructor= require('../shared/iocConstructor');
const _express      = require('express');
const _constants    = require('../../configs/constants.json');

const _router  = _express.Router({mergeParams: true});

const _ioc = new IocConstructor();
const _container = _ioc.initialize();
const _topicService = _container.resolve(_constants.TOPIC_SERVICE);

_router.get('/', async function(req, res) {

    let source = req.query.source ? req.query.source : 'db';

    const topics = await _topicService.getAllTopics(source);

    res.status(200).send(topics);
});

module.exports = _router;