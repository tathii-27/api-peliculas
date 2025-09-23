const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tipo = sequelize.define('tipo', {
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

module.exports = Tipo;

