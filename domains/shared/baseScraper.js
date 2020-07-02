'use strict';

const _cheerio = require('cheerio');
const HttpResponse = require('./http/models/httpResponse');

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

  /**
   * Recursively search through an element to find an element matching the text
   * @param {HTMLElement} parentElement - HTML element to start the search
   * @param {string} textToFind - text content to be searched for
   * @return {HTMLElement} - Found HTML child element (if matched)
   */
  getChildElementsWithText(parentElement, textToFind) {
    const childElements = [];

    // don't look further if there is no parent
    if (parentElement == null) return childElements;
    // don't look further if there is no parent
    if (parentElement.data == null) return childElements;
    // successful match
    if (parentElement.data.includes(textToFind)) return [parentElement];
    // check safety of children before recursevly looking further
    if (parentElement.childNodes == null ||
        parentElement.childNodes.length == 0) return childElements;

    for (let i = 0; i < parentElement.childNodes.length; i++) {
      const childElement = this.getChildElementsWithText(textToFind);
      if (childElement != null) {
        childElements.push(childElements);
      }
    }
    return childElements;
  };
}

module.exports = BaseScraper;
