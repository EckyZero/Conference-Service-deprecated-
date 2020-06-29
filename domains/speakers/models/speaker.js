const NameParser = require('../../shared/nameParser');

const _nameParser = new NameParser();

// TODO: Move to Dependency Injection
class Speaker {
    constructor(preferredName) {
        this.preferredName = preferredName;
        this.firstName = _nameParser.parseFirstName(preferredName);
        this.middleName = _nameParser.parseMiddleName(preferredName);
        this.lastName = _nameParser.parseLastName(preferredName);
    }
}

module.exports = Speaker;