'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: "myapp"});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const talkService = require('./services/talkService');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req,res) => {
    const results = await talkService.getTalks();
    return res.status(200).send(results);
});

module.exports = app;
