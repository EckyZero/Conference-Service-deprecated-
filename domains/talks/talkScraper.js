const _routes = require('../../configs/routes.json');
const _async = require('async');
const BaseScraper = require('../shared/baseScraper');

/**
 * Responsible for retrieving and scraping html pages for talk data
 */
class TalkScraper extends BaseScraper {
  /**
   * Represents a TalkScraper object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.dateParser = opts.dateParser;
    this.talkBuilder = opts.talkBuilder;
    this.objectValidator = opts.objectValidator;
    this.logger = opts.logger;
    this.timer = opts.timer;
  }

  // TODO: Some of the pages have pagination
  // need to figure out how to handle that
  // TODO: Or bbetter yet, figure out how to paginate myself
  // TODO: Document endpoint
  // (ex: Tithing)
  // TODO: in general, add better logging

  /**
   * Retrieve HTML data for the topic and scrape for the object
   * @param {Array} topic - string topics of interest
   */
  async getTalk(topic) {
    const talkUrl = (_routes.BASE_URL + _routes.TALK_PATH).replace('$@', topic);
    let initialResults = [];
    const detailResults = [];

    const $ = await super.loadHtmlContentFromUrl(talkUrl);

    // TODO: Try catch with a specific error (parse Error);
    if (!this.objectValidator.isValid($)) return null;

    // TODO: Try catch with a specific error (parse Error);
    initialResults = this.talkBuilder.buildMany($);

    await _async.forEach(initialResults, async (talk) => {
      const detailTalk = await this.getTalkDetails(talk);
      detailResults.push(detailTalk);
    });

    return detailResults;
  };

  /**
   * Retrieve HTML data for the topi detail information and scrape the object
   * @param {Talk} talk - Talk to retrieve additional details for
   */
  async getTalkDetails(talk) {
    // TODO: Add version to the API
    // TODO: Replace with talk.detailUrl
    // TODO: Inject /study. after .org for it to work
    const $ = await super.loadHtmlContentFromUrl(talk.detailUrl);

    // TODO: Try catch with a specific error (parse Error);
    // TODO: pagination for longer pages
    if (!this.objectValidator.isValid($)) return null;

    const detailTalk = this.talkBuilder.appendDetails($, talk);

    return detailTalk;
  }
}

module.exports = TalkScraper;
