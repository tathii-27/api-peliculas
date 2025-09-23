const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/generos', require('./routes/generoRoutes'));
app.use('/directores', require('./routes/directorRoutes'));
app.use('/medias', require('./routes/mediaRoutes'));
app.use('/productoras', require('./routes/productoraRoutes'));
app.use('/tipos', require('./routes/tipoRoutes'));

// Ruta de prueba para verificar conexión
app.get("/test", (req, res) => {
  res.json({ success: true, message: "Servidor funcionando 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

