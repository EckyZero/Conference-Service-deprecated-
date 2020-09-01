'use strict';

const BaseDatabase = require('../shared/baseDatabase');

/**
 * Responsible for database operations for the Topic domain
 */
class TopicDatabase extends BaseDatabase {
  /**
   * Initialize an instance of the TopicDatabase
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    super(opts);
    this.tableName = 'Topics';
  }

  async getAllTopics() {
    const results = await super.query(`SELECT * FROM ${this.tableName}`);
    return results;
  }

  async getTopic(tag) {
    const results = await super.query(
        `SELECT * FROM ${this.tableName} 
        WHERE tag = ${tag}`);
    return results;
  }

  async ensureTableExists() {
    const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (
      topic_id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 32767 CACHE 1 ),
      title character varying(100) COLLATE pg_catalog."default" NOT NULL,
      tag character varying(100) COLLATE pg_catalog."default" NOT NULL,
      talks_url character varying(200) COLLATE pg_catalog."default"
    )`
    await super.query(sql);
  }
}

module.exports = TopicDatabase;
