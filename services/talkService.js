'use strict';

const topicService = require('../services/topicService');

const getTalks = async function () {
    const topics = await topicService.getTopics();
    return topics;
};

module.exports = {
    getTalks: getTalks
};