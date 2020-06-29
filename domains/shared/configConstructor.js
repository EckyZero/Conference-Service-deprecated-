'use strict';

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const _client = new SecretManagerServiceClient();
let _configs = {};

class ConfigConstructor {
    constructor(opts){

    }

    async get(name) {
        
        let value = null;

        if (_configs[name] === undefined) {
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