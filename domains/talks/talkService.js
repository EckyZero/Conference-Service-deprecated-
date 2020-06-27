'use strict';

const topicService = require('../topics/topicService');

const getTalks = async function () {
    const topics = await topicService.getTopics();

    return topics;
};

const getTalkDetails = async function () {

};

module.exports = {
    getTalks: getTalks,
    getTalkDetails: getTalkDetails
};