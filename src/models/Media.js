const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Media = sequelize.define('media', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  generoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  directorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoraId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false // ⚡ Sin createdAt/updatedAt
});

module.exports = Media;