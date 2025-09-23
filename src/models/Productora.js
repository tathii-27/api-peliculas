const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Productora = sequelize.define('productora', {
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

module.exports = Productora;
