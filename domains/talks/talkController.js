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
        
        let topics = [];
        const { source, limit, orderBy, topic } = req.query;

        if(this.objectValidator.isArray(topic)) {
            topics = topic; 
        } else if (this.objectValidator.isString(topic)) {
            topics.push(topic); 
        }

        try {
            const talks = await this.talkService.getAllTalks(source, topics);
            res.status(200).send(talks);
        } catch (e) {
            // TODO: Consistent error message format
            res.status(200).send(e.message);
        }
    }
}

module.exports = TalkController;