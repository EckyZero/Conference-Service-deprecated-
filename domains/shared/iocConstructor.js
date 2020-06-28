
'use strict';

const TalkService    = require('../talks/talkService');
const TalkScraper    = require('../talks/talkScraper');
const TopicService   = require('../topics/topicService');
const TopicScraper   = require('../topics/topicScraper');
const Logger         = require('./logger');
const Timer          = require('./timer');
const NameParser     = require('../speakers/nameParser');
const ApiClient      = require('./http/apiClient');

const { createContainer, asClass } = require('awilix');

class IocConstructor {
    constructor() {

    }

    // TODO: Test IoC setup
    initialize () {
        const container = createContainer();

        container.register({
            apiClient: asClass(ApiClient),
            baseScraper: asClass(BaseScraper),
            talkService: asClass(TalkService),
            talkScraper: asClass(TalkScraper),
            topicService: asClass(TopicService),
            topicScraper: asClass(TopicScraper), // TODO: Finish IoC Setup for Topic Scraper
            logger: asClass(Logger),
            timer: asClass(Timer),
            nameParser: asClass(NameParser) // TODO: Finish IoC Setup for Name Parser
        });

        return container;
    }
}

module.exports = IocConstructor;