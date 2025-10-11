const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Type = sequelize.define('Type', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Type;
