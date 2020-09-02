'use strict';

const BaseModel = require('../../shared/baseModel');

/**
 * Topic object
 */
class Topic extends BaseModel {
    title;
    tag;
    talks_url;

    /**
     * Initialize an instance of a Topic
     * @constructor
     */
    constructor() {
      super();
    }
}

module.exports = Topic;
