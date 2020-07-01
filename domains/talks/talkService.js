'use strict';

const _async = require('async');

class TalkService {
    constructor(opts) {
        this.topicService = opts.topicService;
        this.talkScraper = opts.talkScraper;
        this.objectValidator = opts.objectValidator;
    }

    async getAllTalks (source, topics) {

        let talks = [];

        if (topics === undefined || topics === null || topics.length == 0) {
            topics = await this.topicService.getAllTopics(source); 
            
            await _async.forEach(topics, async (topic) => {
                const talk = await this.talkScraper.getTalk(topic.tag);

                // TODO: Should consider how the response can better indicate this result
                // TODO: Add a "response" object that holds the response, with metadata about the request at the top level
                if (this.objectValidator.isValid(talk)) {
                    talks = talks.concat(talk);
                }
            });
        } else {
            // TODO: Add additional db source once ready
            // TODO: Move hard-coded strings to constants file
            // if (source === 'web') {

            // }
            // TODO: consolidate this and the similar forEach logic in the above
            // TODO: determine query logic for "union", "distinct", or "merge"
            await _async.forEach(topics, async (topic) => {
                const talk = await this.talkScraper.getTalk(topic);
                talks = talks.concat(talk);
            });
        }
        
    
        return talks;
    };

    async getTalksByTopic () {

    }

    async getTalkDetails () {

    };
}

module.exports = TalkService;