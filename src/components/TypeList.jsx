// TypeList.jsx
import React, { useState } from "react";
import { typesData } from "../api";

const TypeList = () => {
  const [, setRefresh] = useState(0);
  const handleDelete = (id) => {
    const index = typesData.findIndex(t => t.id === id);
    if (index > -1) typesData.splice(index, 1);
    setRefresh(r => r + 1);
  };
  return (
    <ul>
      {typesData.map(t => (
        <li key={t.id}>{t.name} - {t.description} <button onClick={() => handleDelete(t.id)}>Eliminar</button></li>
      ))}
    </ul>
  );
};

export default TypeList;

