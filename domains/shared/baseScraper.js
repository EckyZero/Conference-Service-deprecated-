'use strict';

const _cheerio = require('cheerio');
const HttpResponse = require('./http/models/httpResponse')

/**
 * Base class responsible for core functionality for parsing HTML data
 */
class BaseScraper {
  /**
   * Represents a BaseScraper object
   * @constructor
   * @param {*} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.apiClient = opts.apiClient;
  }

  /**
   * Request the HTML body from the URL and prepare for parsing
   * @param {string} url - URL to load HTML content from
   * @return {jQuery} - Parser prepared to inspect the page
   */
  async loadHtmlContentFromUrl(url) {
    let response = new HttpResponse();

    response = await this.apiClient.get(url);

    if (response.isError) return null;

    const $ = this.loadHtmlContent(response.results);

    return $;
  }

  /**
   * Prepare the HTML page for parsing
   * @param {HTML} html - HTML string to parse
   * @return {jQuery} - Parser prepared to inspect the page
   */
  loadHtmlContent(html) {
    return _cheerio.load(html);
  }
}

module.exports = BaseScraper;
