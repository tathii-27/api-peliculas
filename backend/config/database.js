import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la BD
  process.env.DB_USER,     // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Desactiva el log de queries SQL
  }
);

/**
 * Función que intenta la conexión y la autenticación con la BD.
 */
async function connectDB() {
  try {
    // Aquí es donde 'await' es válido
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    // Sincroniza los modelos con la base de datos (crea tablas si no existen)
    // Nota: Esto debe hacerse después de definir todos tus modelos.
    // await sequelize.sync({ alter: true }); 
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    // Puedes terminar el proceso si la conexión falla
    // process.exit(1); 
  }
}

// Llama a la función para establecer la conexión al iniciar la aplicación.
connectDB();

// Exporta la instancia de Sequelize (CORRECCIÓN: 'sequelize' en lugar de 'sequeliz')
export default sequelize;