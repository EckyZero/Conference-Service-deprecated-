const DateParser = require('../../shared/dateParser');

const _dateParser = new DateParser();

// TODO: Move to Dependency Injection
class Conference {
    constructor(month, year) {
        this.month = _dateParser.monthStringToInt(month);
        this.year = year;
    }
}

module.exports = Conference;