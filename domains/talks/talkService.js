'use strict';

class TalkService {
    constructor(opts) {
        this.topicService = opts.topicService;
    }

    async getAllTalks () {
        const topics = await this.topicService.getTopics();
    
        return topics;
    };

    async getTalksByTopic () {

    }

    async getTalkDetails () {

    };
}

module.exports = TalkService;