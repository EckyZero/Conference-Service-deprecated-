'use strict';

const Person = require('../../persons/models/person');
const Calling = require('../../callings/models/calling');
const database = require('../../shared/database');
const {DataTypes, Model} = require('sequelize');

/**
 * Speaker object (aka the person who gave a talk)
 */
class Speaker extends Model { }

Speaker.init({
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: database,
  modelName: 'speaker',
});

Speaker.Calling = Speaker.belongsTo(Calling);
Speaker.Person = Speaker.belongsTo(Person);

(async () => {
  await Speaker.sync();
})();

module.exports = Speaker;
