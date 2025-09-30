// ProducerForm.jsx
import React, { useState } from "react";
import { producersData } from "../api";

const ProducerForm = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Activo");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    producersData.push({ id: producersData.length + 1, name, status, slogan, description });
    setName(""); setStatus("Activo"); setSlogan(""); setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>
      <input placeholder="Slogan" value={slogan} onChange={(e) => setSlogan(e.target.value)} />
      <input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ProducerForm;
