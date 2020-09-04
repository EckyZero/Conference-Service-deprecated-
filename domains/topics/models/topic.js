'use strict';

const database = require('../../shared/database');
const {DataTypes, Model} = require('sequelize');

/**
 * Topic object
 */
class Topic extends Model { }

Topic.init({
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  talksUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  talksCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'topic',
});

(async () => {
  await Topic.sync();
})();

module.exports = Topic;
