'use strict';

const _async         = require('async');
const _topicScraper  = require('./topicScraper');

const getTopics = async function () {
    const topics = await _topicScraper.getTopics();

    await _async.forEach(topics, async (topic) => {
        const topicTalks = await _topicScraper.getTopicTalks(topic.detailUrl);
        topic.talks = [];

        await _async.forEach(topicTalks, async (topicTalk) => {
            const talkDetails = await _topicScraper.getTopicTalkDetails(topicTalk.talkUrl);
            
            topicTalk.details = talkDetails
            topic.talks.push(topicTalk);
        });
    });

    return topics;
};

module.exports = {
    getTopics: getTopics
};