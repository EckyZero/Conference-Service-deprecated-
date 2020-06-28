const _nameParser = require('../nameParser');

class Speaker {
    constructor(preferredName) {
        this.preferredName = preferredName;
        this.firstName = _nameParser.parseFirstName(preferredName);
        this.middleName = _nameParser.parseMiddleName(preferredName);
        this.lastName = _nameParser.parseLastName(preferredName);
    }
}

module.exports = Speaker;