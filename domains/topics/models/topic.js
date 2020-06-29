'use strict';

class Topic {
    constructor(title, tag, url, count) {
        this.title = title;
        this.tag = tag;
        this.talksUrl = url;
        this.talksCount = count;
    }
}

module.exports = Topic;