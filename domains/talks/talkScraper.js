const _routes     = require(`../../configs/routes.json`); 
const BaseScraper = require('../shared/baseScraper');

class TalkScraper extends BaseScraper {
    constructor(opts) {
        super(opts);
        this.dateParser = opts.dateParser;
        this.talkBuilder = opts.talkBuilder;
        this.objectValidator = opts.objectValidator;
    }

    // TODO: Some of the pages have pagination - need to figure out how to handle that
    // TODO: Or bbetter yet, figure out how to paginate myself
    // TODO: Document endpoint
    // (ex: Tithing)
    async getTalk (topic) {

        let talkUrl  = (_routes.BASE_URL + _routes.TALK_PATH).replace('$@',topic);
        let results = null;

        const $ = await super.loadHtmlContentFromUrl(talkUrl);
        
        // TODO: Add Router for Talks and Topics
        // TODO: Try catch with a specific error (parse Error);
        if (!this.objectValidator.isValid($)) return null;
        
        // TODO: Try catch with a specific error (parse Error);
        results = this.talkBuilder.buildMany($);

        return results;
    };

    async getTalkDetails (topicDetailUrl) {

        let results = null;
    
        try {
    
            const siteContent = await needle("get",topicDetailUrl);
            const $ = cheerio.load(siteContent.body);
            
            const fullName  = $('.author-name')[0].firstChild.data;
            const role      = $('.author-role')[0].firstChild.data;
            const highlight = $('.kicker')[0].firstChild.data.trim();
            const talkTitle = $('#title1')[0].firstChild.data
            let sessionName = "";  
            let sessionOrder = -1;
            
            let sessions = [];
        
            // tighten up
            $('li a div p span').each((i,el) => {
                
                for (let i = 0; i < el.childNodes.length; i++) {
                    const childNode = el.childNodes[i];
                    const sessionNode = getChildElementsWithText(childNode, "Session");
        
                    if (sessionNode !== null & sessionNode.length > 0) {
                        sessions.push(sessionNode[0].data);
                        sessionOrder = -1;
                    } else {
                        sessionOrder++;  
                    }
        
                    if (childNode.data == talkTitle) {
                        sessionName = sessions[sessions.length - 1];
                        sessionOrder = sessionOrder;
                        break;
                    }
                }
                return false;
            });
            
            // Assign to object (i.e. check the name of the field the object is in)
            // Can probably do that in the mapping
            console.log(sessions);
    
            log.info("test");
        }
        catch (e) {
            log.info(e, `Error Scraping: ${topicDetailUrl}`);
        }

        return {
            "fullName": fullName,
            "highlight": highlight,
            "role": role,
            "talkTitle": talkTitle,
            "sessionName": sessionName,
            "sessionOrder": sessionOrder
        }
    };
}

module.exports = TalkScraper;