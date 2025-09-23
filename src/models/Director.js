const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Director = sequelize.define('director', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Director;