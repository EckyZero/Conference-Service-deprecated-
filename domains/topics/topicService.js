'use strict';

class TopicService {
    constructor(opts) {
        this.topicScraper = opts.topicScraper;
    }

    async getAllTopics (source) {
        let topics;

        // TODO: Add additional db source once ready
        // TODO: Move hard-coded strings to constants file
        if (source === 'web') {
            topics = await this._getAllTopicsFromWeb(); 
        }
        
        return topics;
    };

    async _getAllTopicsFromDb () {

    }

    async _getAllTopicsFromWeb () {
        const topics = await this.topicScraper.getAllTopics();
        return topics;
    }
}

module.exports = TopicService;