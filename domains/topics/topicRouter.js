const _express          = require('express');
const _constants        = require('../../configs/constants.json');
const IocConstructor    = require('../shared/iocConstructor');

const _ioc = new IocConstructor();
const _container = _ioc.initialize();
const _router = _express.Router({mergeParams: true});

_router.get('/', async function(req, res) {
    return await _container.resolve(_constants.TOPIC_CONTROLLER).get(req, res);
});

module.exports = _router;