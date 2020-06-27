const getTalks = async function (talksUrl) {

    let results = null;

    try {
        const siteContent = await needle("get",talksUrl);
        const $ = cheerio.load(siteContent.body);
    
        results = $('.lumen-tile').map((i, el) => {
            const talkUrl = routes.BASE_URL + $(el).find('.lumen-tile__title').find('a')[0].attribs.href;
            const talkTitle = $(el).find('.lumen-tile__title').find('a')[0].firstChild.data.trim();
            const talkSpeaker = $(el).find('.lumen-tile__content')[0].firstChild.data.trim();
            const talkDate = $(el).find('.lumen-tile__metadata')[0].firstChild.data.trim();
            const talkThumbnailUrl = $(el).find('.lumen-image__image')[0] ? routes.BASE_URL + $(el).find('.lumen-image__image')[0].attribs["data-src"] : null;
            
            return {
                "talkUrl": talkUrl,
                "title": talkTitle,
                "speaker": talkSpeaker,
                "date": talkDate,
                "thumbnailUrl": talkThumbnailUrl
            };
        }).get();
    }
    catch (e) {
        log.info(e, `Error Scraping: ${topicUrl}`);
    }
    
    return results;
};

const getTalkDetails = async function(topicDetailUrl) {

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
};

module.exports = {
    getTalks: getTalks,
    getTalkDetails: getTalkDetails
};