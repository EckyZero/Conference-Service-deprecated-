'use strict';

const async = require('async');
const topicApi = require('../apis/topicApi');

const getTopics = async function () {
    const topics = await topicApi.getTopics();

    await async.forEach(topics, async (topic) => {
        const topicTalks = await topicApi.getTopicTalks(topic.detailUrl);
        topic.talks = [];

        await async.forEach(topicTalks, async (topicTalk) => {
            const talkDetails = await topicApi.getTopicTalkDetails(topicTalk.talkUrl);
            
            topicTalk.details = talkDetails
            topic.talks.push(topicTalk);
        });
    });

    return topics;
};

module.exports = {
    getTopics: getTopics
};