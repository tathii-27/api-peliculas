const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producer = sequelize.define('Producer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Producer;
