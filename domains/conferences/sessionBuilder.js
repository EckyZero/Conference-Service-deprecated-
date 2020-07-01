'use strict';

const BaseBuilder = require("../shared/baseBuilder");
const Session     = require('./models/session');

class SessionBuilder extends BaseBuilder{

    constructor(opts) {
        super(opts);
        this.conferenceBuilder = opts.conferenceBuilder;
    }

    built($,el) {
        let session = new Session();

        session.conference = this._conference($,el);

        return session;
    }

    _conference($,el) {
        return this.conferenceBuilder.build($,el);
    }
}

module.exports = SessionBuilder;