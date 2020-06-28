'use strict';

const _async         = require('async');
const _topicScraper  = require('./topicScraper');

class TopicService {
    constructor(opts) {
        this.topicScraper = opts.topicScraper;
    }

    async getTopics () {
        const topics = await this.topicScraper.getTopics();
    
        await _async.forEach(topics, async (topic) => {
            const topicTalks = await this.topicScraper.getTopicTalks(topic.detailUrl);
            topic.talks = [];
    
            await _async.forEach(topicTalks, async (topicTalk) => {
                const talkDetails = await this.topicScraper.getTopicTalkDetails(topicTalk.talkUrl);
                
                topicTalk.details = talkDetails
                topic.talks.push(topicTalk);
            });
        });
    
        return topics;
    };
}

module.exports = TopicService;