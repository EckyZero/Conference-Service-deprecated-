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
            response.results = results;
        }

        return response;
    }
}

module.exports = ApiClient;