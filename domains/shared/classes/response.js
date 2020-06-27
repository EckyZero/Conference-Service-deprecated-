class Response {
    constructor (isError, message, content) {
        this.isError = isError;
        this.message = message;
        this.content = content;
    }
}

module.exports = Response;