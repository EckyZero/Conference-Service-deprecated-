'use strict';

const TalkValidator = require('../talks/talkValidator');
const TalkController = require('../talks/talkController');
const TalkService = require('../talks/talkService');
const TalkScraper = require('../talks/talkScraper');
const TalkBuilder = require('../talks/talkBuilder');
const TopicValidator = require('../topics/topicValidator');
const TopicController = require('../topics/topicController');
const TopicService = require('../topics/topicService');
const TopicScraper = require('../topics/topicScraper');
const TopicBuilder = require('../topics/topicBuilder');
const TopicDatabase = require('../topics/topicDatabase');
const SessionBuilder = require('../conferences/sessionBuilder');
const ConferenceBuilder = require('../conferences/conferenceBuilder');
const SpeakerBuilder = require('../speakers/speakerBuilder');
const CallingService = require('../callings/callingService');
const CallingDatabase = require('../callings/callingDatabase');
const PersonService = require('../persons/personService');
const PersonDatabase = require('../persons/personDatabase');
const Logger = require('./logger');
const Timer = require('./timer');
const NameParser = require('./nameParser');
const DateParser = require('./dateParser');
const ApiClient = require('./http/apiClient');
const ObjectValidator = require('../shared/objectValidator');

const {createContainer, asClass, Lifetime} = require('awilix');
const ConfigConstructor = require('./configConstructor');

/**
 * Responsible for building the IoCConstructor
 */
class IocConstructor {
  /**
   * Register all dependencies in the IoC Container
   * @return {object} - IoC container
   */
  initialize() {
    const container = createContainer();

    container.register({
      objectValidator: asClass(ObjectValidator),
      apiClient: asClass(ApiClient),
      talkValidator: asClass(TalkValidator),
      talkController: asClass(TalkController),
      talkService: asClass(TalkService),
      talkScraper: asClass(TalkScraper),
      talkBuilder: asClass(TalkBuilder),
      topicValidator: asClass(TopicValidator),
      topicController: asClass(TopicController),
      topicService: asClass(TopicService),
      topicScraper: asClass(TopicScraper),
      topicBuilder: asClass(TopicBuilder),
      topicDatabase: asClass(TopicDatabase),
      sessionBuilder: asClass(SessionBuilder),
      conferenceBuilder: asClass(ConferenceBuilder),
      speakerBuilder: asClass(SpeakerBuilder),
      callingService: asClass(CallingService),
      callingDatabase: asClass(CallingDatabase),
      personService: asClass(PersonService),
      personDatabase: asClass(PersonDatabase),
      logger: asClass(Logger),
      timer: asClass(Timer),
      nameParser: asClass(NameParser),
      dateParser: asClass(DateParser),
      configs: asClass(ConfigConstructor, {lifetime: Lifetime.SINGLETON}),
    });

    return container;
  }
}

module.exports = IocConstructor;
