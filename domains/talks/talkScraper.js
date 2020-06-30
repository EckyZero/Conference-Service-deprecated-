const _routes     = require(`../../configs/routes.json`); 
const BaseScraper = require('../shared/baseScraper');
const Talk        = require('../talks/models/talk');
const Speaker     = require('../speakers/models/speaker');
const Session     = require('../conferences/models/session');
const Conference  = require('../conferences/models/conference');

class TalkScraper extends BaseScraper {
    constructor(opts) {
        super(opts);
        this.dateParser = opts.dateParser;
    }

    // TODO: Some of the pages have pagination - need to figure out how to handle that
    // TODO: Or bbetter yet, figure out how to paginate myself
    // TODO: Document endpoint
    // (ex: Tithing)
    async getTalk (topic) {

        let talkUrl  = (_routes.BASE_URL + _routes.TALK_PATH).replace('$@',topic);
        let results = null;

        const $ = await super.loadHtmlContentFromUrl(talkUrl);
        
        // TODO: need a better way to handle null or undefined consistently
        if ($ === undefined || $ === null) { return null; }
    
        results = $('.lumen-tile').map((i, el) => {
            const talkUrl = _routes.BASE_URL + $(el).find('.lumen-tile__title').find('a')[0].attribs.href;
            const talkTitle = $(el).find('.lumen-tile__title').find('a')[0].firstChild.data.trim();
            const talkSpeaker = $(el).find('.lumen-tile__content')[0].firstChild.data.trim();
            const talkDate = $(el).find('.lumen-tile__metadata')[0].firstChild.data.trim().split(' ');
            const talkThumbnailUrl = $(el).find('.lumen-image__image')[0] ? _routes.BASE_URL + $(el).find('.lumen-image__image')[0].attribs["data-src"] : null;
            
            const speaker = new Speaker(talkSpeaker);
            const conference = new Conference();

            conference.month = this.dateParser.monthStringToInt(talkDate[0]);
            conference.year = parseInt(talkDate[1]);

            const session = new Session(null, null, conference)
            const talk = new Talk(talkTitle, speaker, session, talkUrl, talkThumbnailUrl);
            return talk;
        }).get();
        
        
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