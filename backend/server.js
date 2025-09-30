// backend/server.js
import express from "express";
import cors from "cors";

// Importar routers
import mediaRoutes from "./routes/media.js";
import genreRoutes from "./routes/genre.js";
import directorRoutes from "./routes/director.js";
import producerRoutes from "./routes/producer.js";
import typeRoutes from "./routes/type.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Películas 🎬');
});

// Rutas de la API
app.use('/media', mediaRoutes);
app.use('/genre', genreRoutes);
app.use('/director', directorRoutes);
app.use('/producer', producerRoutes);
app.use('/type', typeRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
