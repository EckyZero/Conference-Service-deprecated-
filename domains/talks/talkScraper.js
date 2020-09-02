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

  /**
   * Retrieve HTML data for the topic and scrape for the object
   * @param {Array} topic - string topics of interest
   */
  async getTalk(topic) {
    const talkUrl = (_routes.BASE_URL + _routes.TALK_PATH).replace('$@', topic);

    const $ = await super.loadHtmlContentFromUrl(talkUrl);
    const talks = await this.getTalksFromUrl(talkUrl, 1);

    return talks;
  };

  /**
   * Retrieve HTML data for the topi detail information and scrape the object
   * @param {Talk} talk - Talk to retrieve additional details for
   */
  async getTalkDetails(talk) {
    const $ = await super.loadHtmlContentFromUrl(talk.detailUrl);

    if (!this.objectValidator.isValid($)) return null;

    const detailTalk = this.talkBuilder.appendDetails($, talk);

    return detailTalk;
  }

  /**
   * Scrape the talks found on the site
   * @param {string} url - the site to scrape
   * @param {int} index - the page index to start at
   * @return {Array} - list of talks at the url
   */
  async getTalksFromUrl(url, index) {
    let detailResults = [];
    // load contents from the url
    const $ = await super.loadHtmlContentFromUrl(url);

    if (!this.objectValidator.isValid($)) return null;

    // Extract the talk summaries from the page
    const initialResults = this.talkBuilder.buildMany($);

    // Get talk details for each talk summary
    await _async.forEach(initialResults, async (talk) => {
      const detailTalk = await this.getTalkDetails(talk);
      detailResults.push(detailTalk);
    });

    // Check to see if the page is paginated - if so, recurrsively go through each page
    const nextPageUrl = this._getNextPage($, index);

    if (nextPageUrl !== undefined && nextPageUrl !== null) {
      const paginatedResults = await this.getTalksFromUrl(nextPageUrl, index + 1);
      detailResults = [...detailResults, ...paginatedResults];
    }

    return detailResults;
  }

  /**
   * Get the next paginated page
   * @param {jQuery} $ - jQuery Parser
   * @param {int} pageNumber - the current page number
   */
  _getNextPage($, pageNumber) {
    // Depending on the page, we need to offset as when pagination is present,
    // We need to account for the "previous page" and "next page" buttons
    const nextIndex = pageNumber == 1 ? 2 : pageNumber + 2;

    // Find the next node in the pagination so we can extra the url to redirect to
    let selector = `body > div > section > nav > ul > li:nth-child(${nextIndex}) > a`;
    let element = $(selector)[0];
    
    // Means we're at the end. return
    if (element === undefined || element === null) return null;

    // Means we're still iterating
    // Check the page so we can un-offset once the "next page" button disappears
    const dataPage = parseInt(element.attribs['data-page']);

    if (dataPage !== pageNumber + 1) {
      // Means the "next" button is now gone and we need to offset
      selector = `body > div > section > nav > ul > li:nth-child(${nextIndex - 1}) > a`;
      element = $(selector)[0];
    }
    // Generate the next url to visit
    const nextPageUrl = _routes.BASE_URL + element.attribs['href'];

    return nextPageUrl;
  }
}

module.exports = TalkScraper;
