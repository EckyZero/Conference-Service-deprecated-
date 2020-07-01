'use strict';

class TalkController {
    constructor(opts) {
        this.talkService = opts.talkService;
        this.objectValidator = opts.objectValidator;
    }

    async get(req,res) {

        // TODO: Move db to configuration file
        let source = req.query.source ? req.query.source : 'db';
        let topics = [];

        if(this.objectValidator.isArray(req.query.topic)) {
            topics = req.query.topic; 
        } else if (this.objectValidator.isString(req.query.topic)) {
            topics.push(req.query.topic); 
        }

        const talks = await this.talkService.getAllTalks(source, topics);

        res.status(200).send(talks);
    }
}

module.exports = TalkController;