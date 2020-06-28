'use strict';

const _routes     = require(`../../configs/${process.env.NODE_ENV}routes.json`); 

const _topicsUrl   = _routes.BASE_URL + _routes.TOPIC_PATH;

class TopicScraper extends BaseScraper {
    constructor(opts) {
        this.logger = opts.logger;
        this.apiClient = opts.apiClient;
        super(opts);
    }

    async getTopics () {

        let results = null;
    
        try {
            const response = await this.apiClient.get(_topicsUrl);
            const $ = super.loadHtmlContent(siteContent.body);
            
            results = $('.lumen-content').find('.lumen-tile a').map((i, el) => {
                const relativePath = el.attribs.href;
                const topicCounts = el.firstChild.data.split('(');
                const name = topicCounts[0].trim();
                const count = topicCounts[1] ? parseInt(topicCounts[1].trim().slice(0, -1)) : null;
                const language = relativePath.substring(relativePath.lastIndexOf("lang="), relativePath.length).split('=')[1].split('&')[0];
        
                // TODO: Revisit formal modelling for each scraper class
                return {
                    "topic": name,
                    "tag": name.replace(/\s/g, '-').toLowerCase(),
                    "detailUrl": _routes.BASE_URL + relativePath,
                    "count": count,
                    "language": language
                };
            }).get();
        }
        catch (e) {
            this.logger.info(e, `Error Scraping: ${_topicsUrl}`);
        }
    
        return results;
    };
}

module.exports = {
    getTopics: getTopics
};