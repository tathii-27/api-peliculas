// backend/models/index.js
const sequelize = require('../config/database');

const Genre = require('./genre');
const Director = require('./director');
const Producer = require('./producer');
const Type = require('./type');
const Media = require('./media');

// Asociaciones
Media.belongsTo(Genre, { foreignKey: 'genreId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Media.belongsTo(Director, { foreignKey: 'directorId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Media.belongsTo(Producer, { foreignKey: 'producerId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Media.belongsTo(Type, { foreignKey: 'typeId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Genre.hasMany(Media, { foreignKey: 'genreId' });
Director.hasMany(Media, { foreignKey: 'directorId' });
Producer.hasMany(Media, { foreignKey: 'producerId' });
Type.hasMany(Media, { foreignKey: 'typeId' });

module.exports = { sequelize, Media, Genre, Director, Producer, Type };
