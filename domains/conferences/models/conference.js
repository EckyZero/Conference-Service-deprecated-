' use strict';

const database = require('../../shared/database');
const {DataTypes, Model} = require('sequelize');

/**
 * General Conference Object
 */
class Conference extends Model { }

Conference.init({
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  year: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  month: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'conference',
});

(async () => {
  await Conference.sync();
})();

module.exports = Conference;
