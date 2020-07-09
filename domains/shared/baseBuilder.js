/* eslint-disable valid-jsdoc */
'use strict';

/**
 * Base class defining the interface for sub-builders
 */
class BaseBuilder {
  /**
   * Represents a BaseBuilder object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.objectValidator = opts.objectValidator;
  }

  /**
   * Meant to be overriden for creating a single instance of a class
   * Used to construct an object of relevant subclass
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {object} - object matching the subclass of the builder
   */
  build($, el) {}

  /**
   * (Optional) Meant to be overriden for creating multiple instances of a class
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {HTMLElement} el - the target HTMLElement to parse
   * @return {Array} - Array of objects matching the subclass of the builder
   */
  buildMany($, el) {}

  /**
   * Recursively search through an element to find an element matching the text
   * @param {HTMLElement} parentElement - HTML element to start the search
   * @param {string} textToFind - text content to be searched for
   * @return {HTMLElement} - Found HTML child element (if matched)
   */
  getChildElementsWithText(parentElement, textToFind) {
    const childElements = [];

    // don't look further if there is no parent
    if (!this.objectValidator.isValid(parentElement)) return childElements;
    // don't look further if there is no parent
    if (!this.objectValidator.isValid(parentElement.data)) return childElements;

    // successful match
    if (parentElement.data.includes(textToFind)) return [parentElement];

    // check safety of children before recursevly looking further
    if (parentElement.childNodes === null ||
        parentElement.childNodes.length === 0) return childElements;

    for (let i = 0; i < parentElement.childNodes.length; i++) {
      const childElement = this.getChildElementsWithText(textToFind);
      if (childElement != null) {
        childElements.push(childElements);
      }
    }
    return childElements;
  }

  /**
   * Attempt multiple times with different selectors to get data
   * Depending on the age of the page the site used different selectors
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {string} firstKey - first selector to query by
   * @param {string} secondKey - backup selector to query by
   * @return {string} - data for element
   */
  tryGetChildDataWithSelectors($, firstKey, secondKey) {
    let data;
    const nodeArray = $(firstKey);

    if (!this.objectValidator.isValid(nodeArray) || nodeArray.length === 0) {
      if (this.objectValidator.isString(secondKey)) {
        data = this.tryGetChildDataWithSelectors($, secondKey);
      } else {
        return null;
      }
    }
    const firstNode = nodeArray[0];

    if (this.objectValidator.isValid(firstNode)) {
      const firstChild = firstNode.firstChild;
      if (this.objectValidator.isValid(firstChild)) {
        data = firstChild.data.trim();
      }
    }
    return data;
  }
}

module.exports = BaseBuilder;
