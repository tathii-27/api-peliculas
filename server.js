// =========================================================================
// server.js - API Películas (Final y Funcional)
// =========================================================================
import express from "express";
import cors from "cors";
import fs from "fs/promises"; 

const app = express();
const PORT = process.env.PORT || 5000;
const moviesFilePath = "./frontend/src/Movies.json"; 

// Middleware
app.use(cors());
app.use(express.json());

// FUNCIONES AUXILIARES
async function readMoviesFile() {
    // Lee el contenido, parsea y extrae el array 'movies'
    const data = await fs.readFile(moviesFilePath, "utf8");
    const jsonContent = JSON.parse(data);
    return jsonContent.movies || []; 
}

async function writeMoviesFile(movies) {
    // Envuelve el array en el formato objeto { "movies": [...] } para escribir
    const contentToWrite = { movies: movies };
    await fs.writeFile(moviesFilePath, JSON.stringify(contentToWrite, null, 2), "utf8");
}

// RUTAS PRINCIPALES (CRUD)
app.get("/api/movies", async (req, res) => {
    try {
        const movies = await readMoviesFile();
        res.json(movies);
    } catch (error) {
        console.error("Error al leer Movies.json:", error);
        if (error.code === 'ENOENT') {
            return res.status(200).json([]); // Responde sin error si el archivo no existe
        }
        res.status(500).json({ error: "Error al cargar las películas" });
    }
});

app.post("/api/movies", async (req, res) => {
    try {
        const movies = await readMoviesFile();
        let newMovie = req.body;

        // Asignación correcta de ID (soluciona error de sintaxis previo)
        const maxId = movies.length > 0 
            ? Math.max(...movies.map(m => m.id || 0))
            : 0;
            
        newMovie = { id: maxId + 1, ...newMovie };
        movies.push(newMovie);
        await writeMoviesFile(movies); 
        
        res.status(201).json(newMovie);
    } catch (error) {
        console.error("Error al agregar película:", error);
        res.status(500).json({ error: "Error al guardar la película" });
    }
});

// Servidor en ejecución
app.listen(PORT, () => {
    console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
