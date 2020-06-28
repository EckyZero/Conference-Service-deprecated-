class HttpResponse {
    constructor (isError, message, content) {
        this.isError = isError;
        this.message = message;
        this.exception = exception;
        this.results = results;
    }
}

module.exports = HttpResponse;