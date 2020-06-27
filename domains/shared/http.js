const _needle = require ('needle');
const _log    = require('./logger')

class Http {

    get (url) {
        let results;

        try {
            results = await _needle("get",url);
        }
        catch(e) {
            _log.info(e, `Http Error - GET - ${url}`);
        }

        return results;
    }
}