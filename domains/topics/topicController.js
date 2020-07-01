'use strict';

class TopicController {
    constructor(opts) {
        this.topicService = opts.topicService;
    }

    async get(req,res) {
        // TODO: abstract DB to a constant
        let source = req.query.source ? req.query.source : 'db';

        const topics = await this.topicService.getAllTopics(source);

        res.status(200).send(topics);
    }
}

module.exports = TopicController;