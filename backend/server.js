const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let movies = require("./movies.json");

// Obtener todas las películas
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Agregar película
app.post("/movies", (req, res) => {
  const newMovie = req.body;
  newMovie.id = Date.now();
  movies.push(newMovie);
  res.json(newMovie);
});

// Actualizar película
app.put("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex(m => m.id === id);
  if (index !== -1) {
    movies[index] = { ...movies[index], ...req.body };
    res.json(movies[index]);
  } else {
    res.status(404).send("Película no encontrada");
  }
});

// Eliminar película
app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter(m => m.id !== id);
  res.json({ message: "Película eliminada" });
});

app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
