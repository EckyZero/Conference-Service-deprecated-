'use strict';

const _needle      = require ('needle');
const HttpResponse = require('./models/httpResponse')

class ApiClient {

    constructor(opts) {
        this.logger = opts.logger;
    }

    async get (url) {
        let response = new HttpResponse();

        try {
            // TODO: Start timing request
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
            // TODO: Stop timing request
            // TODO: Log total time
        }

        return response;
    }
}

module.exports = ApiClient;