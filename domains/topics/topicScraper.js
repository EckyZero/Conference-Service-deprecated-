'use strict';

const _log        = require('../shared/logger');
const _cheerio    = require('cheerio');
const _routes     = require('../../configs/routes.json'); 
const _needle     = require('needle');

const _topicsUrl   = _routes.BASE_URL + _routes.TOPIC_PATH;

const getTopics = async function () {

    let results = null;

    try {
        const siteContent = await _needle("get", _topicsUrl);
        const $ = _cheerio.load(siteContent.body);
        
        results = $('.lumen-content').find('.lumen-tile a').map((i, el) => {
            const relativePath = el.attribs.href;
            const topicCounts = el.firstChild.data.split('(');
            const name = topicCounts[0].trim();
            const count = topicCounts[1] ? parseInt(topicCounts[1].trim().slice(0, -1)) : null;
            const language = relativePath.substring(relativePath.lastIndexOf("lang="), relativePath.length).split('=')[1].split('&')[0];
    
            return {
                "topic": name,
                "tag": name.replace(/\s/g, '-').toLowerCase(),
                "detailUrl": _routes.BASE_URL + relativePath,
                "count": count,
                "language": language
            };
        }).get();
    }
    catch (e) {
        _log.info(e, `Error Scraping: ${_topicsUrl}`);
    }

    return results;
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const getChildElementsWithText = function (parentElement, textToFind) {

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

module.exports = {
    getTopics: getTopics,
    getTopicTalks: getTopicTalks,
    getTopicTalkDetails: getTopicTalkDetails
};