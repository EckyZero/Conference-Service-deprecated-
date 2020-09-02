'use strict';

const BaseDatabase = require('../shared/baseDatabase');

/**
 * Responsible for database operations for the Speaker domain
 */
class SpeakerDatabase extends BaseDatabase {
  /**
   * Initialize an instance of the SpeakerDatabase
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.tableName = 'Speakers';
  }

  /**
   * Create Table if it doesn't exist
   */
  async ensureTableExists() {
    const sql = `CREATE TABLE ${this.tableName}
    (
        speaker_id serial NOT NULL,
        title character varying(50),
        preferred_name character varying(50),
        first_name character varying(25),
        last_name character varying(25),
        role character varying(100),
        PRIMARY KEY (speaker_id)
    )
    WITH (
        OIDS = FALSE
    );`
    await super.query(sql);
  }
}

module.exports = SpeakerDatabase;
