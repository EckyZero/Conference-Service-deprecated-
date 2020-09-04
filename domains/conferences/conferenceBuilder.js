'use strict';

const _md5 = require('md5');

const BaseBuilder = require('../shared/baseBuilder');
const Conference = require('./models/conference');

/**
 * Responsible for building Conference objects
 */
class ConferenceBuilder extends BaseBuilder {
  /**
  * Represents a ConferenceBuilder object
  * @constructor
  * @param {object} opts - IoC object holding dependencies
  */
  constructor(opts) {
    super(opts);
    this.dateParser = opts.dateParser;
  }

  /**
   * Build a Conference object from an HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Conference} - a conference object
   */
  build($, el) {
    const conference = {};
    const month = this._month($, el);
    const year = this._year($, el);

    conference.month = month;
    conference.year = year;
    conference.uid = _md5(`${month}-${year}`);

    // const month = this._month($, el);
    // const year = this._year($, el);
    // const conference = Conference.build({
    //   month: month,
    //   year: year,
    //   timeOfYear: `${month}-${year}`
    // });
    // return conference;

    return conference;
  }

  /**
   * Parse the month from the HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {number} - 0-12 integer representing the month
   */
  _month($, el) {
    const monthString = $(el)
        .find('.lumen-tile__metadata')[0]
        .firstChild.data.trim()
        .split(' ')[0];
    const monthInt = this.dateParser.monthStringToInt(monthString);

    return monthInt;
  }

  /**
   Parse the year from the HTML element
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {number} - integer representing the year
   */
  _year($, el) {
    const yearString = $(el)
        .find('.lumen-tile__metadata')[0]
        .firstChild.data.trim()
        .split(' ')[1];
    const yearInt = parseInt(yearString);

    return yearInt;
  }
}

module.exports = ConferenceBuilder;
