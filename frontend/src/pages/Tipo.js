import React from "react"; 
const tipos = [
  { id: 1, nombre: "Película" },
  { id: 2, nombre: "Serie" }
];
function Tipo() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tipos</h1>
      <ul className="list-disc pl-5">
        {tipos.map(t => <li key={t.id}>{t.nombre}</li>)}
      </ul>
    </div>
  );
}
export default Tipo;
