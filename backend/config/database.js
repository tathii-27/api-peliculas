// backend/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la BD
  process.env.DB_USER,     // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

// Probar la conexión
try {
  await sequelize.authenticate();
  console.log('✅ Conexión a la base de datos establecida correctamente.');
} catch (error) {
  console.error('❌ Error al conectar con la base de datos:', error);
}

export default sequeliz