'use strict';

const _routes = require('../../configs/routes.json');
const BaseBuilder = require('../shared/baseBuilder');
const Talk = require('./models/talk');

class TalkBuilder extends BaseBuilder {

    constructor(opts) {
        super(opts);
        this.speakerBuilder = opts.speakerBuilder;
        this.sessionBuilder = opts.sessionBuilder;
    }

    build($,el) {
        let talk = new Talk();

        talk.title = this._title($,el);
        talk.speaker = this._speaker($,el);
        talk.session = this._session($,el);
        talk.detailUrl = this._url($,el);
        talk.thumbnailUrl = this._thumbnail($,el);

        return talk;
    }

    buildMany($) {
        let results = [];

        results = $('.lumen-tile').map((i, el) => {
            return this.build($,el);
        }).get();

        return results;
    }

    _url ($,el) {
        return _routes.BASE_URL + $(el).find('.lumen-tile__title').find('a')[0].attribs.href;
    }

    _title ($,el) {
        return $(el).find('.lumen-tile__title').find('a')[0].firstChild.data.trim();
    }

    _thumbnail ($,el) {
        return $(el).find('.lumen-image__image')[0] ? _routes.BASE_URL + $(el).find('.lumen-image__image')[0].attribs["data-src"] : null;
    }

    _speaker ($,el) {
        return this.speakerBuilder.build($,el);
    }

    _session ($,el) {
        return this.sessionBuilder.build($,el);
    }
}

module.exports = TalkBuilder;