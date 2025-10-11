import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// CORRECCIÓN 1: Cambiar de './App' a './MoviesApp.jsx'
import MoviesApp from './MoviesApp.jsx'; 

// CORRECCIÓN 2: Añadir la extensión a reportWebVitals
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MoviesApp /> 
  </React.StrictMode>
);

reportWebVitals();