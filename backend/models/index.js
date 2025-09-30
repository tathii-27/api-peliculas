const sequelize = require('../config/db');

// Importar modelos
const Genre = require('./genre');
const Director = require('./director');
const Producer = require('./producer');
const Type = require('./type');
const Media = require('./media');

// Definir asociaciones
Media.belongsTo(Genre, { foreignKey: 'genreId' });
Media.belongsTo(Director, { foreignKey: 'directorId' });
Media.belongsTo(Producer, { foreignKey: 'producerId' });
Media.belongsTo(Type, { foreignKey: 'typeId' });

// El otro lado
Genre.hasMany(Media, { foreignKey: 'genreId' });
Director.hasMany(Media, { foreignKey: 'directorId' });
Producer.hasMany(Media, { foreignKey: 'producerId' });
Type.hasMany(Media, { foreignKey: 'typeId' });

module.exports = {
  sequelize,
  Media,
  Genre,
  Director,
  Producer,
  Type
};
