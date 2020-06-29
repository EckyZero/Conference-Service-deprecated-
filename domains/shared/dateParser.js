
const _monthStrings = ["january",    "february","march",    "april",
                        "may",       "june",    "july",     "august", 
                        "september", "october", "november", "december"];

class DateParser {
    
    monthStringToInt (month) {

        // TODO: Add type of checks to helper class
        if (month === undefined || month === null || month.length == 0) return null;
        if (typeof month !== 'string') return null;
        
        const formattedMonth = month.toLowerCase().trim();

        // TODO: Add additional checks to validate unfound indexes
        const monthInt = _monthStrings.indexOf(formattedMonth) + 1;

        return monthInt;
    }
    
    intMonthToYear (month) {
    
        // TODO: Add type of checks to helper class
        if (month === undefined || month === null || month.length == 0) return null;
        if (typeof month !== 'number') return null;

        // TODO: Add additional checks to validate if not found
        const monthString = _monthStrings[month];

        return monthString;
    }
}

module.exports = DateParser;