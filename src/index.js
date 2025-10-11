import React from "react";
import ReactDOM from "react-dom/client";
import MoviesApp from "./MoviesApp.jsx"; // <-- ¡CORRECTO! Ahora importa el archivo real.

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MoviesApp /> 
  </React.StrictMode>
);