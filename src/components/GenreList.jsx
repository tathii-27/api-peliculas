import React, { useState } from "react";
import { genresData } from "../api";

const GenreList = () => {
  const [, setRefresh] = useState(0); // solo para forzar render

  const handleDelete = (id) => {
    const index = genresData.findIndex((g) => g.id === id);
    if (index > -1) genresData.splice(index, 1);
    setRefresh((r) => r + 1);
  };

  return (
    <ul>
      {genresData.map((genre) => (
        <li key={genre.id}>
          {genre.name} - {genre.status} <button onClick={() => handleDelete(genre.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
