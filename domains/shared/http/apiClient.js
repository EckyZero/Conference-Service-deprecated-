'use strict';

const _needle      = require ('needle');
const HttpResponse = require('./models/httpResponse')

class ApiClient {

    constructor(opts) {
        this.logger = opts.logger;
        this.timer = opts.timer;
    }

    async get (url) {
        let response = new HttpResponse();
        const startTime = this.timer.currentTime();

        try {
            const results = await _needle("get",url);

            response.isError = false;
            response.results = results ? results.body : body;
        }
        catch(e) {
            const message = `Http Error - GET - ${url}`;

            this.logger.info(e, message);

            response.isError = true
            response.message = message;
            response.exception = e;
        }
        finally {
            const duration = this.timer.getMillisecondsSinceTime(startTime);
            this.logger.info(`Http - GET - ${url} completed in ${duration} milliseconds`);
        }

        return response;
    }
}

module.exports = ApiClient;