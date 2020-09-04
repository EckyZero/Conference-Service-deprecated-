'use strict';

const database = require('../../shared/database');
const {DataTypes, Model} = require('sequelize');
const Conference = require('./conference');

/**
 * General Conference Session Object
 */
class Session extends Model { }

Session.init({
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conferenceOrder: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'session',
});

Session.Conference = Session.belongsTo(Conference);

(async () => {
  await Session.sync();
})();

module.exports = Session;
