// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Importar los módulos (aún vacíos, los vamos a crear luego)
import Genero from "./modules/Genero";
import Director from "./modules/Director";
import Productora from "./modules/Productora";
import Tipo from "./modules/Tipo";
import Media from "./modules/Media";

const App = () => {
  return (
    <Router>
      <div className="app">
        <header style={{ padding: "1rem", background: "#282c34", color: "#fff" }}>
          <h1>🎬 Plataforma de Películas - Ude@</h1>
          <nav>
            <Link to="/generos" style={{ margin: "0 10px", color: "white" }}>
              Géneros
            </Link>
            <Link to="/directores" style={{ margin: "0 10px", color: "white" }}>
              Directores
            </Link>
            <Link to="/productoras" style={{ margin: "0 10px", color: "white" }}>
              Productoras
            </Link>
            <Link to="/tipos" style={{ margin: "0 10px", color: "white" }}>
              Tipos
            </Link>
            <Link to="/media" style={{ margin: "0 10px", color: "white" }}>
              Media
            </Link>
          </nav>
        </header>

        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/generos" element={<Genero />} />
            <Route path="/directores" element={<Director />} />
            <Route path="/productoras" element={<Productora />} />
            <Route path="/tipos" element={<Tipo />} />
            <Route path="/media" element={<Media />} />
            <Route path="/" element={<h2>Bienvenido al administrador de películas 🎥</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
