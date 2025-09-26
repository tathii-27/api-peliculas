import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GenresPage from "./pages/GenresPage";
import DirectorsPage from "./pages/DirectorsPage";
import ProducersPage from "./pages/ProducersPage";
import TypesPage from "./pages/TypesPage";
import MediaPage from "./pages/MediaPage";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/genres" style={{ marginRight: "10px" }}>Géneros</Link>
          <Link to="/directors" style={{ marginRight: "10px" }}>Directores</Link>
          <Link to="/producers" style={{ marginRight: "10px" }}>Productoras</Link>
          <Link to="/types" style={{ marginRight: "10px" }}>Tipos</Link>
          <Link to="/media">Media</Link>
        </nav>
        <Routes>
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/directors" element={<DirectorsPage />} />
          <Route path="/producers" element={<ProducersPage />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/" element={<h1>Bienvenido al Frontend de Películas</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


