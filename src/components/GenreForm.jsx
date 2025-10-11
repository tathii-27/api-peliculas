import React, { useState } from "react";
import { genresData } from "../api";

const GenreForm = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Activo");

  const handleSubmit = (e) => {
    e.preventDefault();
    genresData.push({ id: genresData.length + 1, name, status });
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

export default GenreForm;
