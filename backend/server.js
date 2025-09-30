// backend/server.js
import express from 'express';
import mediaRoutes from './routes/media.js';
import genreRoutes from './routes/genre.js';
import directorRoutes from './routes/director.js';
import producerRoutes from './routes/producer.js';
import typeRoutes from './routes/type.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de bienvenida en la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Películas 🎬');
});

// Rutas de la API
app.use('/media', mediaRoutes);
app.use('/genre', genreRoutes);
app.use('/director', directorRoutes);
app.use('/producer', producerRoutes);
app.use('/type', typeRoutes);

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
