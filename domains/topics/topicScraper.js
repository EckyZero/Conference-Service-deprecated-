'use strict';

const _routes     = require(`../../configs/routes.json`); 
const BaseScraper = require('../shared/baseScraper');
const Topic       = require('../topics/models/topic');

const _topicsUrl  = _routes.BASE_URL + _routes.TOPIC_PATH;

class TopicScraper extends BaseScraper {
    constructor(opts) {
        super(opts);
    }

    async getAllTopics () {

        const $ = await super.loadHtmlContentFromUrl(_topicsUrl);
        
        if ($ === undefined) { return null; }

        const results = $('.lumen-content').find('.lumen-tile a').map((i, el) => {
            
            const topicCounts = el.firstChild.data.split('(');
            const name = topicCounts[0].trim();
            const count = topicCounts[1] ? parseInt(topicCounts[1].trim().slice(0, -1)) : null;
            const detailUrl = _routes.BASE_URL + el.attribs.href;
            const tag = name.replace(/\s/g, '-').toLowerCase();
    
            const topic = new Topic(name,tag,detailUrl,count);
            
            return topic;
        }).get();
    
        return results;
    };
}

module.exports = TopicScraper;