'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const _client = new SecretManagerServiceClient();

/**
 * Responsible for query environment configurations
 */
class ConfigConstructor {

  configs;

  /**
   * Represents a ConfigConstructor object
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts){
    this.objectValidator = opts.objectValidator;
  }

  /**
   * Get configuration by name
   * @param {string} name - key name for configuration to query
   */
  async get(name) {
    
    let value = null;
    if (!this.objectValidator.isValid(configs)) {
      this.configs = {};
    }

    if (this.configs[name] === undefined) {
      const secret = await _client.getSecret({"name": name});
      value = secret.data;
      configs[name] = value;
    } else {
      value = configs[name];
    }

    return secret;
  }
}

module.exports = ConfigConstructor;
