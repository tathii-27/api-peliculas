import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Genero from "./pages/Genero";
import Director from "./pages/Director";
import Productora from "./pages/Productora";
import Tipo from "./pages/Tipo";
import Media from "./pages/Media";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/genero" element={<Genero />} />
        <Route path="/director" element={<Director />} />
        <Route path="/productora" element={<Productora />} />
        <Route path="/tipo" element={<Tipo />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </Router>
  );
}

export default App;
