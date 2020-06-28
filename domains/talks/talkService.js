'use strict';

class TalkService {
    constructor(opts) {
        this.topicService = opts.topicService;
    }

    async getTalks () {
        const topics = await this.topicService.getTopics();
    
        return topics;
    };

    async getTalkDetails () {

    };
}

module.exports = TalkService;