'use strict';

const TalkService    = require('../talks/talkService');
const TalkScraper    = require('../talks/talkScraper');
const TopicService   = require('../topics/topicService');
const TopicScraper   = require('../topics/topicScraper');
const Logger         = require('./logger');
const Timer          = require('./timer');
const NameParser     = require('./nameParser');
const DateParser     = require('./dateParser');
const ApiClient      = require('./http/apiClient');

const { createContainer, asClass, Lifetime } = require('awilix');
const ConfigConstructor = require('./configConstructor');

class IocConstructor {
    constructor() {

    }

    initialize () {
        const container = createContainer();

        container.register({
            apiClient: asClass(ApiClient),
            talkService: asClass(TalkService),
            talkScraper: asClass(TalkScraper),
            topicService: asClass(TopicService),
            topicScraper: asClass(TopicScraper),
            logger: asClass(Logger),
            timer: asClass(Timer),
            nameParser: asClass(NameParser),
            dateParser: asClass(DateParser),
            configs: asClass(ConfigConstructor, { lifetime: Lifetime.SINGLETON }),
        });

        return container;
    }
}

module.exports = IocConstructor;