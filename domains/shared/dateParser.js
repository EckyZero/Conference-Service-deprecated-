
const _monthStrings = ["january",    "february","march",    "april",
                        "may",       "june",    "july",     "august", 
                        "september", "october", "november", "december"];

class DateParser {
    constructor(opts) {
        this.objectValidator = opts.objectValidator;
    }
    
    monthStringToInt (month) {

        if (!this.objectValidator.isString()) return null;
        if (month.length < 3) return null;
        
        const formattedMonth = month.toLowerCase().trim().substring(0,3);

        const monthInt = _monthStrings.findIndex(el => el.includes(formattedMonth)) + 1;
        const response = monthInt === 0 ? null : monthInt;

        return response;
    }
    
    intMonthToString (month) {
    
        if (!this.objectValidator.isNumber(month)) return null;

        const monthString = _monthStrings[month - 1] ? _monthStrings[month - 1] : null;

        return monthString;
    }
}

module.exports = DateParser;