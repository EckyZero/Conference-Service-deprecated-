const Sequelize = require('sequelize');
const database = new Sequelize(process.env.DB_NAME,
    process.env.DB_USER, process.env.DB_PWD, {
      host: process.env.DB_HOST,
      dialect: 'postgres',
    });

(async () => {
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = database;
