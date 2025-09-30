const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Producer = sequelize.define('Producer', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Producer;
