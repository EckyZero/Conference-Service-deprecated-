'use strict';

const _routes     = require(`../../configs/routes.json`); 
const BaseScraper = require('../shared/baseScraper');

const _topicsUrl  = _routes.BASE_URL + _routes.TOPIC_PATH;

class TopicScraper extends BaseScraper {
    constructor(opts) {
        super(opts);
        this.topicBuilder = opts.topicBuilder;
        this.objectValidator = opts.objectValidator;
    }

    async getAllTopics () {

        const $ = await super.loadHtmlContentFromUrl(_topicsUrl);
        
        if ($ === undefined) { return null; }

        let results = [];

        results = this.topicBuilder.buildMany($);
    
        return results;
    };
}

module.exports = TopicScraper;