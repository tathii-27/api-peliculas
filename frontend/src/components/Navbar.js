import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex gap-4">
      <Link to="/genero" className="hover:underline">Género</Link>
      <Link to="/director" className="hover:underline">Director</Link>
      <Link to="/productora" className="hover:underline">Productora</Link>
      <Link to="/tipo" className="hover:underline">Tipo</Link>
      <Link to="/media" className="hover:underline">Media</Link>
    </nav>
  );
}

export default Navbar;
