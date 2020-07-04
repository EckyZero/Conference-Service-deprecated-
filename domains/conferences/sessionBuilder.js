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
    const session = new Session();

    session.conference = this._conference($, el);

    return session;
  }

  /**
   * 
   * @param {*} $ 
   * @param {*} el 
   * @return {object}
   */
  buildConferenceDetails($, talkTitle) {
    let sessionName = '';
    let sessionOrder = -1;

    let sessions = [];

    $('li a div p span').each((i, el) => {
      for (let i = 0; i < el.childNodes.length; i++) {
        const childNode = el.childNodes[i];
        const sessionNode = super.getChildElementsWithText(childNode, 'Session');

        if (sessionNode !== null & sessionNode.length > 0) {
          sessions.push(sessionNode[0].data);
          sessionOrder = -1;
        } else {
          sessionOrder++;
        }
        // TODO: Session Order is wrong
        if (childNode.data == talkTitle) {
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
