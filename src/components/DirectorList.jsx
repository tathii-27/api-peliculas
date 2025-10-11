// DirectorList.jsx
import React, { useState } from "react";
import { directorsData } from "../api";

const DirectorList = () => {
  const [, setRefresh] = useState(0);

  const handleDelete = (id) => {
    const index = directorsData.findIndex((d) => d.id === id);
    if (index > -1) directorsData.splice(index, 1);
    setRefresh((r) => r + 1);
  };

  return (
    <ul>
      {directorsData.map((d) => (
        <li key={d.id}>
          {d.name} - {d.status} <button onClick={() => handleDelete(d.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default DirectorList;
