const express = require('express');
const cors = require('cors');
const movies = require('./movies.json'); // Asegúrate de que este archivo exista

const app = express();
const port = 3000;

app.use(cors());

// Ruta simple para obtener todas las películas
app.get('/movies', (req, res) => {
    // Devuelve el contenido del JSON como respuesta
    res.json(movies); 
});

app.listen(port, () => {
    // Corrección de sintaxis: usando template literal (backticks) para incluir la variable port
    console.log(`Backend corriendo en http://localhost:${port}`);
});
