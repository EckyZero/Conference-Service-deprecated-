'use strict';

const BaseBuilder = require('../shared/baseBuilder');
const Session = require('./models/session');

/**
 * Responsible for building Session Objects
 */
class SessionBuilder extends BaseBuilder {
  /**
   * Represents a SessionBuilder object
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
