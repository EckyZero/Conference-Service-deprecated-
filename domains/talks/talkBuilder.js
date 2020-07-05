'use strict';

const _routes = require('../../configs/routes.json');
const BaseBuilder = require('../shared/baseBuilder');
const Talk = require('./models/talk');

const _elderCallings = ['apostle', 'seventy'];
const _brotherCallings = ['school', 'young men'];
const _sisterCallings = ['young women', 'relief', 'primary'];
const _validTitles = ['president', 'brother', 'sister', 'elder', 'bishop'];

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
    this.objectValidator = opts.objectValidator;
    this.logger = opts.logger;
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

    return talk;
  }

  /**
   * 
   * @param {*} $ 
   * @param {*} el 
   */
  appendDetails($, talk) {
    const confDetails = this.sessionBuilder.buildConferenceDetails($, talk.title);

    talk.session.name = confDetails.sessionName;
    talk.sessionOrder = confDetails.sessionOrder;
    talk.session.conferenceOrder = confDetails.conferenceOrder;

    talk.description = this._description($);
    talk.quote = this._quote($);
    talk.thumbnailUrl = this._thumbnail($);
    talk.speaker.role = this._role($);
    talk.speaker.title = this._speakerTitle($);
    
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

  /**
   * Parse the thumbnail of the talk
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {string} - string thumbnail url of the talk
   */
  _thumbnail($) {
    return $('head > meta:nth-child(7)')[0].attribs.content;
  }

  /**
   * TODO
   * @param {*} $ 
   * @param {*} el 
   * @return {string} - 
   */
  _role($) {
    let role = $('.author-role')[0] ?
      $('.author-role')[0].firstChild.data : $('#p2')[0].firstChild.data;

    if (role.length > 60) {
      role = 'President of The Church of Jesus Christ of Latter-day Saints';
    }
    return role;
  }

  /**
   * 
   * @param {*} $ 
   * @param {*} el 
   * @return {string}
   */
  _quote($) {
    return $('.kicker')[0] ?
        $('.kicker')[0].firstChild.data.trim() : null;
  }

  /**
   * 
   * @param {*} $ 
   * @param {*} el 
   * @return {string}
   */
  _description($) {
    return $('head > meta:nth-child(6)')[0].attribs.content;
  }

  /**
   * 
   * @param {*} $ 
   * @param {*} el 
   * @return {string}
   */
  _speakerTitle($) {
    let title;

    const role = this._role($);
    const name = super.tryGetChildDataWithSelectors($, '.author-name', '#p1');

    // TODO: Can we simplify this logic?
    // If we know the name, parse for the appropriate title
    if (this.objectValidator.isString(name)) {
      const nameElements = name.split(' ');
      const matchingNames = nameElements.filter(
          (el) => this.objectValidator.arrayIncludesValue(_validTitles, el));

      if (matchingNames.length > 0) {
        title = matchingNames[0];
        return title;
      }
    }

    // TODO: config file for hard-coded values
    // If we still don't know the title, parse the role for organizations
    if (this.objectValidator.isString(role)) {
      if (this.objectValidator.arrayIncludesValue(_brotherCallings, role)) {
        title = 'Brother';
        return title;
      // eslint-disable-next-line max-len
      } else if (this.objectValidator.arrayIncludesValue(_sisterCallings, role)) {
        title = 'Sister';
        return title;
      // eslint-disable-next-line max-len
      } else if (this.objectValidator.arrayIncludesValue(_elderCallings, role)) {
        title = 'Elder';
        return title;
      }

      // If we still don't know the name, compare against a comprehensive list
      const roleElements = role.split(' ');
      const matchingRoles = roleElements.filter(
          (el) => this.objectValidator.arrayIncludesValue(_validTitles, el));

      if (matchingRoles.length > 0) {
        title = matchingRoles[0];
        return title;
      }
    }
    return title;
  }
}

module.exports = TalkBuilder;
