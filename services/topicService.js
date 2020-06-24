'use strict';

const async = require('async');
const talkApi = require('../apis/topicApi');

const getTopics = async function () {
    const topics = await talkApi.getTopics();

    await async.forEach(topics, async (topic) => {
        const topicTalks = await talkApi.getTopicTalks(topic.detailUrl);
        
        topic.talks = topicTalks;
    });

    return topics;
};

module.exports = {
    getTopics: getTopics
};