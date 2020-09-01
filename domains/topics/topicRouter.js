const _express = require('express');
const _constants = require('../../configs/constants.json');
const IocConstructor = require('../shared/iocConstructor');

const _ioc = new IocConstructor();
const _container = _ioc.initialize();
// eslint-disable-next-line new-cap
const _router = _express.Router({mergeParams: true});
const _validator = _container.resolve(_constants.TOPIC_VALIDATOR);

_router.get('/', _validator.validateGet(), async (req, res) => {
  const controller = _container.resolve(_constants.TOPIC_CONTROLLER);
  await controller.get(req, res);
});

_router.post('/', async (req, res) => {
  const controller = _container.resolve(_constants.TOPIC_CONTROLLER);
  await controller.post(req, res);
});

module.exports = _router;
