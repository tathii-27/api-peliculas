// src/models/genero.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genero = sequelize.define('Genero', {
  nombre: { type: DataTypes.STRING, allowNull: false }
}, {
  timestamps: false // <-- evita createdAt y updatedAt
});

module.exports = Genero;
