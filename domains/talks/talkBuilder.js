'use strict';

const _routes = require('../../configs/routes.json');
const BaseBuilder = require('../shared/baseBuilder');
const Talk = require('./models/talk');

/**
 * Responsible for building Talk objects
 */
class TalkBuilder extends BaseBuilder {
  /**
  * Represents a TalkBuilder object
  * @constructor
  * @param {*} opts - IoC object holding dependencies
  */
  constructor(opts) {
    super(opts);
    this.speakerBuilder = opts.speakerBuilder;
    this.sessionBuilder = opts.sessionBuilder;
  }

  /**
   * Build a Talk object from an HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Talk} - a talk object
   */
  build($, el) {
    const talk = new Talk();

    talk.title = this._title($, el);
    talk.speaker = this._speaker($, el);
    talk.session = this._session($, el);
    talk.detailUrl = this._url($, el);
    talk.thumbnailUrl = this._thumbnail($, el);

    return talk;
  }

  /**
   * Build multiple talk objects using jQuery
   * @param {jQuery} $ - Parser used to inspect the element
   * @return {Array} - An array of talk objects
   */
  buildMany($) {
    let results = [];

    results = $('.lumen-tile').map((i, el) => {
      return this.build($, el);
    }).get();

    return results;
  }

  /**
   * Parse the url of the talk's content
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {string} - string representation of the talk's content url
   */
  _url($, el) {
    return _routes.BASE_URL + $(el)
        .find('.lumen-tile__title')
        .find('a')[0].attribs.href;
  }

  /**
   * Parse the title of the talk
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {string} - string title of the talk
   */
  _title($, el) {
    return $(el)
        .find('.lumen-tile__title')
        .find('a')[0].firstChild.data
        .trim();
  }

  /**
   * Parse the thumbnail of the talk
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {string} - string thumbnail url of the talk
   */
  _thumbnail($, el) {
    const url = $(el).find('.lumen-image__image')[0];
    return url ? _routes.BASE_URL + url.attribs['data-src'] : null;
  }

  /**
   * Parse the speaker of the talk
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Speaker} - the speaker of the talk
   */
  _speaker($, el) {
    return this.speakerBuilder.build($, el);
  }

  /**
   * Parse the session of the talk
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Session} - the session the talk was given in
   */
  _session($, el) {
    return this.sessionBuilder.build($, el);
  }
}

module.exports = TalkBuilder;
