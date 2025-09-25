import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Genero from "./pages/Genero";
import Director from "./pages/Director";
import Tipo from "./pages/Tipo";
import Productora from "./pages/Productora";
import Media from "./pages/Media";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#ddd" }}>
        <Link to="/genero" style={{ marginRight: 10 }}>Género</Link>
        <Link to="/director" style={{ marginRight: 10 }}>Director</Link>
        <Link to="/tipo" style={{ marginRight: 10 }}>Tipo</Link>
        <Link to="/productora" style={{ marginRight: 10 }}>Productora</Link>
        <Link to="/media">Media</Link>
      </nav>
      <Routes>
        <Route path="/genero" element={<Genero />} />
        <Route path="/director" element={<Director />} />
        <Route path="/tipo" element={<Tipo />} />
        <Route path="/productora" element={<Productora />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </Router>
  );
}
