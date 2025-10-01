import React from "react"; 
const directores = [
  { id: 1, nombre: "James Cameron" },
  { id: 2, nombre: "Christopher Nolan" },
  { id: 3, nombre: "Steven Spielberg" }
];
function Director() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Directores</h1>
      <ul className="list-disc pl-5">
        {directores.map(d => <li key={d.id}>{d.nombre}</li>)}
      </ul>
    </div>
  );
}
export default Director;
