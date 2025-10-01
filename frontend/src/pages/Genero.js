import React from "react"; 
const generos = [
  { id: 1, nombre: "Acción" },
  { id: 2, nombre: "Aventura" },
  { id: 3, nombre: "Ciencia Ficción" },
  { id: 4, nombre: "Drama" },
  { id: 5, nombre: "Terror" }
];
function Genero() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Géneros</h1>
      <ul className="list-disc pl-5">
        {generos.map(g => <li key={g.id}>{g.nombre}</li>)}
      </ul>
    </div>
  );
}
export default Genero;
