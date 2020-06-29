'use strict';

class Topic {
    constructor(name, tag, url, count) {
        this.name = name;
        this.tag = tag;
        this.talksUrl = url;
        this.talksCount = count;
    }
}

module.exports = Topic;