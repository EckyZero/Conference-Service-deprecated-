const _cheerio = require('cheerio');

class BaseScraper {
    constructor(opts) {
        
    }

    loadHtmlContent(html) {
        return _cheerio.load(html);
    }

    getChildElementsWithText (parentElement, textToFind) {
    
        let childElements = []
    
        if (parentElement == null) { return childElements; }                                                    // don't look further if there is no parent
        if (parentElement.data == null) { return childElements; }                                               // don't look further if there is no parent
        if (parentElement.data.includes(textToFind)) {return [parentElement]; }                                 // successful match
        if (parentElement.childNodes == null || parentElement.childNodes.length == 0) { return childElements; } // check safety of children before recursevly looking further
        
        for (let i = 0; i < parentElement.childNodes.length; i++) {
            const childElement = getChildElementsWithText(textToFind);
            if (childElement != null) { 
                childElements.push(childElements); 
            }
        }
        
        return childElements;
    };
}

module.exports = BaseScraper;