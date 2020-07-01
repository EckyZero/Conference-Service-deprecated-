'use strict';

const _routes     = require(`../../configs/routes.json`);

const BaseBuilder = require("../shared/baseBuilder");
const Topic = require("./models/topic");

class TopicBuilder extends BaseBuilder{

    constructor(opts) {
        super(opts);
    }

    build($,el) {
        const topic = new Topic();
            
        topic.title = this._title($,el);
        topic.tag = this._tag($,el);
        topic.talksUrl = this._talksUrl($,el);
        topic.talksCount = this._count($,el);
        
        return topic;
    }

    buildMany($){
        let results = [];

        results = $('.lumen-content').find('.lumen-tile a').map((i, el) => {
            return this.build($,el);
        }).get();

        return results;
    }

    _title($,el) {
        const topicCounts = el.firstChild.data.split('(');
        return topicCounts[0].trim();
    }

    _count($,el) {
        const topicCounts = el.firstChild.data.split('(');
        return topicCounts[1] ? parseInt(topicCounts[1].trim().slice(0, -1)) : null;
    }

    _talksUrl($,el) {
        return _routes.BASE_URL + el.attribs.href;
    }

    _tag($,el) {
        const topicCounts = el.firstChild.data.split('(');
        const name = topicCounts[0].trim();
        return name.replace(/\s/g, '-').toLowerCase();
    }
}

module.exports = TopicBuilder;