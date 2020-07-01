'use strict';

const BaseBuilder = require("../shared/baseBuilder");
const Speaker     = require('./models/speaker');

class SpeakerBuilder extends BaseBuilder{

    constructor(opts) {
        super(opts);
        this.nameParser = opts.nameParser;
    }

    build($,el) {
        let speaker = new Speaker();
        let fullName = this._name($,el);
        
        speaker.preferredName = fullName;
        speaker.firstName = this.nameParser.parseFirstName(fullName);
        speaker.middleName = this.nameParser.parseMiddleName(fullName);
        speaker.lastName = this.nameParser.parseLastName(fullName);

        return speaker;
    }

    _name ($,el) {
        return $(el).find('.lumen-tile__content')[0].firstChild.data.trim();
    }
}

module.exports = SpeakerBuilder;