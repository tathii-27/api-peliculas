// MediaList.jsx
import React, { useState } from "react";
import { mediaData } from "../api";

const MediaList = () => {
  const [, setRefresh] = useState(0);
  const handleDelete = (id) => {
    const index = mediaData.findIndex(m => m.id === id);
    if (index > -1) mediaData.splice(index, 1);
    setRefresh(r => r + 1);
  };

  return (
    <ul>
      {mediaData.map(m => (
        <li key={m.id}>
          {m.title} ({m.type}) - {m.genre} <button onClick={() => handleDelete(m.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default MediaList;
