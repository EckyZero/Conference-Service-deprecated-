/* eslint-disable valid-jsdoc */
'use strict';

/**
 * Base class defining the interface for sub-builders
 */
class BaseBuilder {
  /**
   * Represents a BaseBuilder object
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {

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
}

module.exports = BaseBuilder;
