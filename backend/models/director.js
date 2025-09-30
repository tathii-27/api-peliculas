const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Director = sequelize.define('Director', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Director;
