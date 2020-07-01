'use strict';

const _validator = require('express-validator');

class TalkController {
    constructor(opts) {
        this.talkService = opts.talkService;
        this.objectValidator = opts.objectValidator;
    }

    async get(req,res) {

        const errors = _validator.validationResult(req);

        if (!errors.isEmpty()) {
            // TODO: consistent error message format
            return res.status(400).json({ errors: errors.array() });
        }
        
        // todo add support for limit, orderBy, the "DB" source, and merge, union, or distinct with topics
        const { source, limit, orderBy, topic } = req.query;
        let topics = [];

        if(this.objectValidator.isArray(topic)) {
            topics = topic; 
        } else if (this.objectValidator.isString(topic)) {
            topics.push(topic); 
        }

        try {
            // TODO: Wrap response in a consistent object
            const talks = await this.talkService.getAllTalks(source, topics);
            res.status(200).send(talks);
        } catch (e) {
            // TODO: Consistent error message format
            res.status(200).send(e.message);
        }
    }
}

module.exports = TalkController;