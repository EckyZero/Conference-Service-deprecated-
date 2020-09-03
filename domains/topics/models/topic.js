'use strict';

const database = require('../../shared/database');
const {DataTypes, Model} = require('sequelize');

/**
 * Topic object
 */
class Topic extends Model { }

Topic.init({
  topicId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

(async () => {
  await Topic.sync();
})();

module.exports = Topic;
