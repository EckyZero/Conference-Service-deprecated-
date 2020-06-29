class HttpResponse {
    constructor (isError, message, exception, results) {
        this.isError = isError;
        this.message = message;
        this.exception = exception;
        this.results = results;
    }
}

module.exports = HttpResponse;