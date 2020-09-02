'use strict';

const BaseModel = require('../../shared/baseModel');

/**
 * The calling of a speaker
 */
class Calling extends BaseModel {
    // enum of all possible titles
    static TITLES = {
      BROTHER: 'Brother',
      SISTER: 'Sister',
      ELDER: 'Elder',
    };

    title;
    role;

    /**
     * Initialize an instance of a Calling
     * @constructor
     * @param {string} title - prefix for the title (ex: Brother, Sister, etc.)
     * @param {string} role - their function in ('of the Sunday School')
     */
    constructor(title, role) {
      super();
      this.title = title;
      this.role = role;
    }
}

module.exports = Calling;
