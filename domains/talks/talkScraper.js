const _routes = require(`../../configs/routes.json`);
const BaseScraper = require('../shared/baseScraper');

/**
 * Responsible for retrieving and scraping html pages
 */
class TalkScraper extends BaseScraper {
  /**
   * Represents a TalkScraper object
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.dateParser = opts.dateParser;
    this.talkBuilder = opts.talkBuilder;
    this.objectValidator = opts.objectValidator;
    this.logger = opts.logger
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
    let results = null;

    const $ = await super.loadHtmlContentFromUrl(talkUrl);

    // TODO: Try catch with a specific error (parse Error);
    if (!this.objectValidator.isValid($)) return null;

    // TODO: Try catch with a specific error (parse Error);
    results = this.talkBuilder.buildMany($);

    return results;
  };

  /**
   * Retrieve HTML data for the topi detail information and scrape the object
   * @param {string} topicDetailUrl - URL of the detail page for a topic
   */
  async getTalkDetails(topicDetailUrl) {
    let results = null;

    try {
      const siteContent = await needle("get",topicDetailUrl);
      const $ = cheerio.load(siteContent.body);

      const fullName = $('.author-name')[0].firstChild.data;
      const role = $('.author-role')[0].firstChild.data;
      const highlight = $('.kicker')[0].firstChild.data.trim();
      const talkTitle = $('#title1')[0].firstChild.data;
      let sessionName = '';
      let sessionOrder = -1;

      let sessions = [];

      // TODO: Refactor to builder
      $('li a div p span').each((i, el) => {
        for (let i = 0; i < el.childNodes.length; i++) {
          const childNode = el.childNodes[i];
          const sessionNode = getChildElementsWithText(childNode, 'Session');

          if (sessionNode !== null & sessionNode.length > 0) {
            sessions.push(sessionNode[0].data);
            sessionOrder = -1;
          } else {
            sessionOrder++;
          }

          if (childNode.data == talkTitle) {
            sessionName = sessions[sessions.length - 1];
            sessionOrder = sessionOrder;
            break;
          }
        }
        return false;
      });
      // Assign to object (i.e. check the name of the field the object is in)
      // Can probably do that in the mapping
      console.log(sessions);
      this.logger.info('test');
    } catch (e) {
      this.logger.info(e, `Error Scraping: ${topicDetailUrl}`);
    }

    // TODO: Refactor to builder
    return {
      'fullName': fullName,
      'highlight': highlight,
      'role': role,
      'talkTitle': talkTitle,
      'sessionName': sessionName,
      'sessionOrder': sessionOrder};
  };
}

module.exports = TalkScraper;
