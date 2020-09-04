'use strict';

const BaseBuilder = require('../shared/baseBuilder');
const Session = require('./models/session');

/**
 * Responsible for building Session Objects
 */
class SessionBuilder extends BaseBuilder {
  /**
   * Represents a SessionBuilder object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.conferenceBuilder = opts.conferenceBuilder;
  }

  /**
   * Build a Session object from an HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Session} - a session object
   */
  build($, el) {
    const session = {};

    session.conference = this._conference($, el);

    // const session = Session.build({
    //   sessionConference: uuidv4(),
    //   conference: this._conference($, el),
    // });

    return session;
  }

  /**
   * Get more conference details (SessionName, SessionOrder, ConferenceOrder)
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {string} talkTitle - used for finding it's order in a session
   * @return {object} - object containing additiona meta-data about a conference
   */
  buildConferenceDetails($, talkTitle) {
    let sessionName = '';
    let sessionOrder = -1;

    const sessions = [];

    $('li a div p span').each((i, el) => {
      for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i];
        const sessionNode = super.getChildElementsWithText(child, 'Session');

        if (sessionNode !== null & sessionNode.length > 0) {
          sessions.push(sessionNode[0].data);
          sessionOrder = -1;
        } else {
          sessionOrder++;
        }
        if (child.data === talkTitle) {
          sessionName = sessions[sessions.length - 1];
          sessionOrder = sessionOrder;
          return false;
        }
      }
    });

    return {
      sessionName: sessionName,
      sessionOrder: sessionOrder,
      conferenceOrder: sessions.length - 1,
    };
  }

  /**
   * Parse the conference object from the HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Conference} - the conference the session is in
   */
  _conference($, el) {
    return this.conferenceBuilder.build($, el);
  }
}

module.exports = SessionBuilder;
