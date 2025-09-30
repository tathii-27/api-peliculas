const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Media = sequelize.define('Media', {
  serial: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  synopsis: { type: DataTypes.TEXT },
  url: { type: DataTypes.STRING, allowNull: false, unique: true },
  image: { type: DataTypes.STRING },
  year: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = Media;
