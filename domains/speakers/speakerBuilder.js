'use strict';

const _md5 = require('md5');

const BaseBuilder = require('../shared/baseBuilder');
const Speaker = require('./models/speaker');

/**
 * Responsible for building Speaker objects
 */
class SpeakerBuilder extends BaseBuilder {
  /**
   * Represents a SpeakerBuilder object
   * @constructor
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
    const speaker = {};
    const fullName = this._name($, el);

    speaker.person = {};
    speaker.person.uid = _md5(fullName);
    speaker.person.preferredName = fullName;
    speaker.person.firstName = this.nameParser.parseFirstName(fullName);
    speaker.person.middleName = this.nameParser.parseMiddleName(fullName);
    speaker.person.lastName = this.nameParser.parseLastName(fullName);
    speaker.calling = {};


    // const fullName = this._name($, el);
    // const speaker = Speaker.build({
    //   personCalling: fullName,
    //   person: {
    //     preferredName: fullName,
    //     firstName: this.nameParser.parseFirstName(fullName),
    //     middleName: this.nameParser.parseMiddleName(fullName),
    //     lastName: this.nameParser.parseLastName(fullName),
    //   },
    // });
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
