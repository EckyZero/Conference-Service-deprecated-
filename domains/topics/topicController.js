'use strict';

const _validator = require('express-validator');

class TopicController {
    constructor(opts) {
        this.topicService = opts.topicService;
    }

    async get(req,res) {
        
        const errors = _validator.validationResult(req);

        if (!errors.isEmpty()) {
            // TODO: Consistent error message format
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO: implement limit and orderBy
        const { source, limit, orderBy } = req.query;

        try {
            // TODO: Wrap response in a consistent object
            const topics = await this.topicService.getAllTopics(source);
            res.status(200).send(topics);
        } catch (e) {
            // TODO: Consistent error message format
            res.status(200).send(e.message);
        }
    }
}

module.exports = TopicController;