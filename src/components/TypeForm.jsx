// TypeForm.jsx
import React, { useState } from "react";
import { typesData } from "../api";

const TypeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    typesData.push({ id: typesData.length + 1, name, description });
    setName(""); setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default TypeForm;


