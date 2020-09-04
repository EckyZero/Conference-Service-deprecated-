'use strict';

const database = require('../../shared/database');
const {DataTypes, Model} = require('sequelize');

/**
 * Person object (aka the person who gave a talk)
 */
class Person extends Model { }

Person.init({
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  preferredName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'person',
});

(async () => {
  await Person.sync();
})();

module.exports = Person;

// TODO: Get an error that the 'calling's and 'speaker' relation does not exist