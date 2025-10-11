const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Datos iniciales de ejemplo
let movies = [
    { id: 1, title: "The Matrix", year: 1999, genre: "Sci-Fi" },
    { id: 2, title: "Inception", year: 2010, genre: "Action" },
    { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi" },
    { id: 4, title: "The Dark Knight", year: 2008, genre: "Action" },
    { id: 5, title: "Pulp Fiction", year: 1994, genre: "Crime" }
];
let idCounter = movies.length + 1;

// Listar todas las películas
app.get("/movies", (req, res) => {
    res.json(movies);
});

// Obtener película por ID
app.get("/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("No encontrada");
    res.json(movie);
});

// Crear película
app.post("/movies", (req, res) => {
    const movie = { id: idCounter++, ...req.body };
    movies.push(movie);
    res.status(201).json(movie);
});

// Actualizar película
app.put("/movies/:id", (req, res) => {
    const index = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("No encontrada");
    movies[index] = { ...movies[index], ...req.body };
    res.json(movies[index]);
});

// Eliminar película
app.delete("/movies/:id", (req, res) => {
    movies = movies.filter(m => m.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
