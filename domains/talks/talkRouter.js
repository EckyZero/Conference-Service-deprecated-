const _express          = require('express');
const _constants        = require('../../configs/constants.json');
const IocConstructor    = require('../shared/iocConstructor');

const _ioc = new IocConstructor();
const _container = _ioc.initialize();
const _router = _express.Router({mergeParams: true});
const _validator = _container.resolve(_constants.TOPIC_VALIDATOR);

// TODO: Install LINT
_router.get('/', 
            _validator.validateGet(),
            async (req, res) =>  await _container.resolve(_constants.TALK_CONTROLLER).get(req, res)
);

module.exports = _router;