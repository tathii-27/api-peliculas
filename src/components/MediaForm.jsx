// MediaForm.jsx
import React, { useState } from "react";
import { mediaData, genresData, directorsData, producersData, typesData } from "../api";

const MediaForm = () => {
  const [serial, setSerial] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState(genresData[0]?.name || "");
  const [director, setDirector] = useState(directorsData[0]?.name || "");
  const [producer, setProducer] = useState(producersData[0]?.name || "");
  const [type, setType] = useState(typesData[0]?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    mediaData.push({ id: mediaData.length + 1, serial, title, synopsis, url, image, releaseYear, genre, director, producer, type });
    setSerial(""); setTitle(""); setSynopsis(""); setUrl(""); setImage(""); setReleaseYear("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Serial" value={serial} onChange={e => setSerial(e.target.value)} />
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Sinopsis" value={synopsis} onChange={e => setSynopsis(e.target.value)} />
      <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
      <input placeholder="Imagen" value={image} onChange={e => setImage(e.target.value)} />
      <input placeholder="Año" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} />
      <select value={genre} onChange={e => setGenre(e.target.value)}>
        {genresData.map(g => <option key={g.id}>{g.name}</option>)}
      </select>
      <select value={director} onChange={e => setDirector(e.target.value)}>
        {directorsData.map(d => <option key={d.id}>{d.name}</option>)}
      </select>
      <select value={producer} onChange={e => setProducer(e.target.value)}>
        {producersData.map(p => <option key={p.id}>{p.name}</option>)}
      </select>
      <select value={type} onChange={e => setType(e.target.value)}>
        {typesData.map(t => <option key={t.id}>{t.name}</option>)}
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default MediaForm;
