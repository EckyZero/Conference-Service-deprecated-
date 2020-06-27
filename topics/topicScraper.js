'use strict';

const log        = require('../utils/logger');
const cheerio    = require('cheerio');
const axios      = require("axios");
const routes     = require('../configs/routes.json'); 
const needle     = require('needle');
const puppeteer  = require('puppeteer');

const topicsUrl   = routes.BASE_URL + routes.TOPIC_PATH;

const getTopics = async function () {

    let results = null;

    const tempUrl = "https://www.churchofjesuschrist.org/general-conference/2019/10/56andersen?lang=eng&encoded=true";
    const siteContent = await axios.get(tempUrl);
    const $ = cheerio.load(siteContent.data);
    
    const fullName = $('.author-name')[0].firstChild.data;
    const role = $('.author-role')[0].firstChild.data;
    const highlight = $('.kicker')[0].firstChild.data.trim();
    
    let sessions = {};
    let currentSession = "";
    let chosenSession = "";
    
    // tighten up
    $('li a div p span').map((i,el) => {
    
        let lowestChildren = [];
        
        for (let i = 0; i < el.childNodes.length; i++) {
            let child = el.childNodes[i];
            if (child.childNodes.length == 0) {
                lowestChildren.push(child.data.trim());
                if (child.data.includes("Session")) { // replace with recursion
                    currentSession = child.data.replace("Session","").trim();
                    sessions[currentSession] = []
                }
            } else {
                for (let j = 0; j < child.childNodes.length; j++) {
                    let lowerChild = child.childNodes[j];
                    if (lowerChild.childNodes.length == 0) {
                        lowestChildren.push(lowerChild.data.trim());
                        if (lowerChild.data.includes("Session")) { // replace with recursion
                            currentSession = child.data.replace("Session","").trim();
                            sessions[currentSession] = []
                        }
                    }
                }
            }
        }
    
        let name = lowestChildren.join(" ");
    
        if (name.includes("Session")) {
            name = name.replace("Session","").trim();
        }
    
        if(sessions[currentSession] && currentSession !== name) {
            sessions[currentSession].push(name);
        }
    });
    
    // Assign to object (i.e. check the name of the field the object is in)
    // Can probably do that in the mapping
    console.log(sessions);

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

const getTopicTalkDetails = async function(topicDetailUrl) {

    let results = null;

    try {
        sleep (5000);
        const siteContent = await needle("get",topicDetailUrl);
        const $ = cheerio.load(siteContent.body);

        log.info("test");
    }
    catch (e) {
        log.info(e, `Error Scraping: ${topicDetailUrl}`);
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


module.exports = {
    getTopics: getTopics,
    getTopicTalks: getTopicTalks,
    getTopicTalkDetails: getTopicTalkDetails
};