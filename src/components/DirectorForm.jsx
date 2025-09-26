// DirectorForm.jsx
import React, { useState } from "react";
import { directorsData } from "../api";

const DirectorForm = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Activo");

  const handleSubmit = (e) => {
    e.preventDefault();
    directorsData.push({ id: directorsData.length + 1, name, status });
    setName("");
    setStatus("Activo");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default DirectorForm;
