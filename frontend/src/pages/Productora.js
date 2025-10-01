import React from "react"; 
const productoras = [
  { id: 1, nombre: "Disney" },
  { id: 2, nombre: "Warner Bros" },
  { id: 3, nombre: "Paramount" }
];
function Productora() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Productoras</h1>
      <ul className="list-disc pl-5">
        {productoras.map(p => <li key={p.id}>{p.nombre}</li>)}
      </ul>
    </div>
  );
}
export default Productora;
