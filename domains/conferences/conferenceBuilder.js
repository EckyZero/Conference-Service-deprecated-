'use strict';

const BaseBuilder = require("../shared/baseBuilder");
const Conference  = require('./models/conference');

class ConferenceBuilder extends BaseBuilder{

    constructor(opts) {
        super(opts);
        this.dateParser = opts.dateParser;
    }

    build($,el) {
        let conference = new Conference();

        conference.month = this._month($,el);
        conference.year = this._year($,el);

        return conference;
    }

    _month($,el) {
        let monthstring = $(el).find('.lumen-tile__metadata')[0].firstChild.data.trim().split(' ')[0];
        let monthInt = this.dateParser.monthStringToInt(monthString);

        return monthInt;
    }

    _year($,el) {
        let yearString = $(el).find('.lumen-tile__metadata')[0].firstChild.data.trim().split(' ')[1];
        let yearInt = parseInt(talkDate[1]);

        return yearInt;
    }
}

module.exports = ConferenceBuilder;