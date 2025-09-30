const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Genre = sequelize.define('Genre', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = Genre;
