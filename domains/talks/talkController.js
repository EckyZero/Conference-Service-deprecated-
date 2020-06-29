'use strict';

const IocConstructor= require('../shared/iocConstructor');
const _express      = require('express');
const _constants    = require('../../configs/constants.json');

const _router  = _express.Router({mergeParams: true});

const _ioc = new IocConstructor();
const _container = _ioc.initialize();
const _talkService = _container.resolve(_constants.TALK_SERVICE);

_router.get('/', async function(req, res) {

    // TODO: Move db to configuration file
    let source = req.query.source ? req.query.source : 'db';
    let topics = [];
    
    // TODO: Better in put validation of params
    // TODO: Query support for returning the full talk object
    if (Array.isArray(req.query.topic)) { 
        topics = req.query.topic; 
    }
    else if (typeof req.query.topic === 'string') {
        topics.push(req.query.topic); 
    }

    const talks = await _talkService.getAllTalks(source, topics);

    res.status(200).send(talks);
});

_router.get('')

module.exports = _router;