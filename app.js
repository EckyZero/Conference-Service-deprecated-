var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cheerio = require('cheerio');
const axios = require("axios");
const siteUrl = "https://www.churchofjesuschrist.org/general-conference/topics?lang=eng";
const siteDomain = "https://www.churchofjesuschrist.org"

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req,res) => {
    const testResponse  = { field: "Hello", value: "World"};
    const $ = await fetchData();
    
    const results = $('.lumen-content').find('.lumen-tile a').map((i, el) => {
        const relativePath = el.attribs.href;
        const topicCounts = el.firstChild.data.split('(');
        const name = topicCounts[0].trim();
        const count = topicCounts[1] ? topicCounts[1].trim().slice(0, -1) : null;
        const language = relativePath.substring(relativePath.lastIndexOf("lang="), relativePath.length).split('=')[1].split('&')[0];

        return {
            "topic": name,
            "tag": name.replace(/\s/g, '-').toLowerCase(),
            "url": siteDomain + relativePath,
            "count": count,
            "language": language
        };
    }).get();

    return res.status(200).send(results);
});

const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};


module.exports = app;
