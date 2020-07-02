'use strict';

const BaseBuilder = require('../shared/baseBuilder');
const Speaker = require('./models/speaker');

/**
 * Responsible for building Speaker objects
 */
class SpeakerBuilder extends BaseBuilder {
  /**
   * Represents a SpeakerBuilder object
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.nameParser = opts.nameParser;
  }

  /**
   * Build a Speaker object from an HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Speaker} - a speaker object
   */
  build($, el) {
    const speaker = new Speaker();
    const fullName = this._name($, el);

    speaker.preferredName = fullName;
    speaker.firstName = this.nameParser.parseFirstName(fullName);
    speaker.middleName = this.nameParser.parseMiddleName(fullName);
    speaker.lastName = this.nameParser.parseLastName(fullName);

    return speaker;
  }

  /**
   * Parse the speakers from from the HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {string} - the full name of the speaker
   */
  _name($, el) {
    return $(el).find('.lumen-tile__content')[0].firstChild.data.trim();
  }
}

module.exports = SpeakerBuilder;
