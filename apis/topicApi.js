'use strict';

const log        = require('../utils/logger');
const cheerio    = require('cheerio');
const axios      = require("axios");
const routes     = require('../configs/routes.json'); 
const needle     = require('needle');

const topicsUrl   = routes.BASE_URL + routes.TOPIC_PATH;

const getTopics = async function () {

    let results = null;

    try {
        const siteContent = await needle("get", topicsUrl);
        const $ = cheerio.load(siteContent.body);
        
        results = $('.lumen-content').find('.lumen-tile a').map((i, el) => {
            const relativePath = el.attribs.href;
            const topicCounts = el.firstChild.data.split('(');
            const name = topicCounts[0].trim();
            const count = topicCounts[1] ? parseInt(topicCounts[1].trim().slice(0, -1)) : null;
            const language = relativePath.substring(relativePath.lastIndexOf("lang="), relativePath.length).split('=')[1].split('&')[0];
    
            return {
                "topic": name,
                "tag": name.replace(/\s/g, '-').toLowerCase(),
                "detailUrl": routes.BASE_URL + relativePath,
                "count": count,
                "language": language
            };
        }).get();
    }
    catch (e) {
        log.info(e, `Error Scraping: ${topicsUrl}`);
    }

    return results;
};

const getTopicTalks = async function (topicUrl) {

    let results = null;

    try {
        const siteContent = await needle("get",topicUrl);
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

module.exports = {
    getTopics: getTopics,
    getTopicTalks: getTopicTalks
};