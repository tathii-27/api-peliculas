import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Media from "./components/Media";
import Genero from "./components/Genero";
import Director from "./components/Director";
import Productora from "./components/Productora";
import Tipo from "./components/Tipo";

export default function App() {
  return (
    <Router>
      <div>
        <nav style={{ background: "#222", padding: "10px" }}>
          <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>Media</Link>
          <Link to="/genero" style={{ color: "#fff", marginRight: "15px" }}>Género</Link>
          <Link to="/director" style={{ color: "#fff", marginRight: "15px" }}>Director</Link>
          <Link to="/productora" style={{ color: "#fff", marginRight: "15px" }}>Productora</Link>
          <Link to="/tipo" style={{ color: "#fff" }}>Tipo</Link>
        </nav>

        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Media />} />
            <Route path="/genero" element={<Genero />} />
            <Route path="/director" element={<Director />} />
            <Route path="/productora" element={<Productora />} />
            <Route path="/tipo" element={<Tipo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}



