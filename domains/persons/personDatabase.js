'use strict';

const BaseDatabase = require('../shared/baseDatabase');

/**
 * Responsible for database operations for the Person domain
 */
class PersonDatabase extends BaseDatabase {
  /**
   * Initialize an instance of the PersonDatabase
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.tableName = 'Persons';
  }

  /**
   * Create Table if it doesn't exist
   */
  async ensureTableExists() {
    throw ('Need to implement in person database');
    const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (
      topic_id serial NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 32767 CACHE 1 ),
      title character varying(100) COLLATE pg_catalog."default" NOT NULL,
      tag character varying(100) COLLATE pg_catalog."default" NOT NULL,
      talks_url character varying(200) COLLATE pg_catalog."default"
    )`
    await super.query(sql);
  }
}

module.exports = PersonDatabase;
