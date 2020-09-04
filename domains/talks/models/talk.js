'use strict';

const database = require('../../shared/database');
const {DataTypes, Model, Deferrable} = require('sequelize');
const Speaker = require('../../speakers/models/speaker');
const Session = require('../../conferences/models/session');

/**
 * The Talk object given at a conference
 */
class Talk extends Model {}

Talk.init({
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sessionOrder: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  detailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'talk',
});

Talk.Speaker = Talk.belongsTo(Speaker);
Talk.Session = Talk.belongsTo(Session);

(async () => {
  await Talk.sync();
})();

module.exports = Talk;
