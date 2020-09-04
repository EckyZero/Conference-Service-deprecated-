'use strict';

const database = require('../../shared/database');
const {DataTypes, Model} = require('sequelize');

/**
 * The calling of a speaker
 */
class Calling extends Model {
    // enum of all possible titles
    static TITLES = {
      BROTHER: 'Brother',
      SISTER: 'Sister',
      ELDER: 'Elder',
    };
}

Calling.init({
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'calling',
});

(async () => {
  await Calling.sync();
})();

module.exports = Calling;
