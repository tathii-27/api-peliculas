import React from "react";
import "./Media.css";

function Media() {
  return (
    <div>
      <h2>🎬 Catálogo de Películas</h2>

      <div className="media">
        <img src="/images/pelicula1.jpg" alt="Película 1" />
        <h3>Película 1</h3>
        <p>Descripción de la película 1</p>
      </div>

      <div className="media">
        <img src="/images/pelicula2.jpg" alt="Película 2" />
        <h3>Película 2</h3>
        <p>Descripción de la película 2</p>
      </div>

      <div className="media">
        <img src="/images/pelicula3.jpg" alt="Película 3" />
        <h3>Película 3</h3>
        <p>Descripción de la película 3</p>
      </div>
    </div>
  );
}

export default Media;


