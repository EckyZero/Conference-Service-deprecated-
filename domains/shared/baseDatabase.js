const _pg = require('pg');
const _pgFormat = require('pg-format');

const AWS = require('aws-sdk');
const _secretsManager = new AWS.SecretsManager();

/**
 * Parent function implementing CRUD operations against the database
 */
class BaseDatabase {
  pool;
  tableName;
  /**
   * Initialize and instance of the BaseDatabase
   * @constructor
   * @param {object} opts - IoC object holding dependencies
   */
  constructor(opts) {
    this.logger = opts.logger;
  }

  /**
   * Query the database with the SQL syntax
   * @param {string} sqlStatement - SQL syntax to execute against the DB
   */
  async query(sqlStatement) {
    let client;
    try {
      this.logger.info(`Connecting to client pool`);
      let pool = await this.getConnectionPool()
      
      client = await pool.connect();

      this.logger.info(`Executing query: ${sqlStatement}`);
      const response = await client.query(sqlStatement);

      this.logger.info(`Success - Query response: ${JONS.stringif(response.rows)}`);
      client.release();

      return response.rows;
    } catch (error) {
      this.logger.error(`Error - Query response: ${error}`);
      throw error;
    } 
  }

  async insert(items) {
    const columns = [...new Set(items.flatMap((i) => Object.keys(i)))].join(', ');
    const rows = items.map((i) => Object.values(i))
    const sql = _pgFormat(`INSERT INTO ${this.tableName} (${columns}) VALUES %L returning id`, rows);
    
    await this.query(sql);
    
    return;
  }

  async insertAllIfNotFound(items, comparisonValue) {
    const columnsArray = [...new Set(items.flatMap((i) => Object.keys(i)))];
    const columns = columnsArray.join(', ');
    const rows = items.map((i) => Object.values(i))

    let sql = `WITH data (${columns}) AS (
      VALUES\n\t`;
    
    for (let i = 0; i < rows.length; i++) {
      const values = Object.values(rows[i]);
      for (let j = 0; j < values.length; j++) {
        const value = values[j];
        
        // Begin grouping for this update
        if (j === 0) { 
          sql = sql.concat(`(`) 
        }

        if (value === undefined || value === null) {
          sql = sql.concat(` NULL, `)
        } else if (isNaN(value)) {
          sql = sql.concat(` '${value}', `)
        } else {
          sql = sql.concat(` ${value}, `)
        }
        
        // Closing grouping for this update
        if (j === values.length - 1) { 
          sql = sql.substring(0, sql.length - 2); // remove last 2 chars
          sql = sql.concat(`),\n\t `) 
        }
      }
      // End processing all rows
      if (i === rows.length - 1) { 
        sql = sql.substring(0, sql.length - 4); // remove last char and tabs
        sql = sql.concat(`\n)`) 
      }
    }

    sql = sql.concat(`
      INSERT INTO ${this.tableName} (${columns})
      SELECT `);

    for (let i = 0; i < columnsArray.length; i++) {
      sql = sql.concat(`d.${columnsArray[i]}, `);
    }
    sql = sql.substring(0, sql.length - 2); // remove trailing space and comman

    sql = sql.concat(`
      FROM data d`)

    if (comparisonValue !== undefined && comparisonValue !== null) {
      sql = sql.concat(`
        WHERE NOT EXISTS (SELECT 1 FROM ${this.tableName} s WHERE s.${comparisonValue} = d.${comparisonValue})`);
    }

    const results = await this.query(sql);

    return results;
  }

  /**
   * Get a connection to the database. Lazy initialize pool if needed
   */
  async getConnectionPool() {
    if (this.pool === undefined || this.pool === null) {
      const config = {
        user: process.env.PGUSER || await this.getSecret('DB.USER'),
        password: process.env.PGPWD || await this.getSecret('DB.PASSWORD'),
        host: process.env.PGHOST || await this.getSecret('DB.HOST'),
        port: process.env.PGPORT || await this.getSecret('DB.PORT'),
        database: process.env.PGDATABASE || await this.getSecret('DB.DATABASE'),
        max: 20,
        idleTimeoutMillis: 30000,
      };
      this.pool = new _pg.Pool(config);
    }
    return this.pool;
  }

  /**
   * Retrieve the secret AWS by the key
   * @param {string} key - key name for the secret
   */
  async getSecret(key) {
    return new Promise((resolve, reject) => {
      const params = {
        SecretId: key,
      };
      _secretsManager.getSecretValue(params, (error, data) => {
        if (error) return reject(error);
        else return resolve(data);
      });
    });
  }

  /**
   * Abstract method to ensure subclasses add necessary logic for
   * checking/instantiating their own table
   */
  async ensureTableExists() {
    throw new Error('Cannot call abstract method "ensureTableExists"')
  }
}

module.exports = BaseDatabase;