# Ruta de carpetas
$componentsFolder = ".\frontend\src\components"
$assetsFolder = ".\frontend\public\assets"

# Crear carpetas si no existen
if (-not (Test-Path $componentsFolder)) { New-Item -ItemType Directory -Path $componentsFolder | Out-Null }
if (-not (Test-Path $assetsFolder)) { New-Item -ItemType Directory -Path $assetsFolder | Out-Null }

# Crear un placeholder local si no existe
$placeholderPath = Join-Path $assetsFolder "placeholder.jpg"
if (-not (Test-Path $placeholderPath)) {
    # Generar un archivo vacío para simular la imagen
    Set-Content -Path $placeholderPath -Value "" 
}

# Crear Media.js
$mediaJsPath = Join-Path $componentsFolder "Media.js"
$mediaJsContent = @"
import React from 'react';
import './Media.css';

const media = [
  { id: 1, title: 'Avatar', year: 2009, genero: 'Acción', image: process.env.PUBLIC_URL + '/assets/placeholder.jpg' },
  { id: 2, title: 'Matrix', year: 1999, genero: 'Ciencia Ficción', image: process.env.PUBLIC_URL + '/assets/placeholder.jpg' },
  { id: 3, title: 'Inception', year: 2010, genero: 'Acción', image: process.env.PUBLIC_URL + '/assets/placeholder.jpg' },
  { id: 4, title: 'Titanic', year: 1997, genero: 'Drama', image: process.env.PUBLIC_URL + '/assets/placeholder.jpg' },
  { id: 5, title: 'Interstellar', year: 2014, genero: 'Ciencia Ficción', image: process.env.PUBLIC_URL + '/assets/placeholder.jpg' },
  { id: 6, title: 'Avengers', year: 2012, genero: 'Acción', image: process.env.PUBLIC_URL + '/assets/placeholder.jpg' }
];

const Media = () => {
  return (
    <div className="media-container">
      {media.map(item => (
        <div className="media-card" key={item.id}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.genero} - {item.year}</p>
        </div>
      ))}
    </div>
  );
};

export default Media;
"@
Set-Content -Path $mediaJsPath -Value $mediaJsContent -Encoding UTF8

# Crear Media.css
$mediaCssPath = Join-Path $componentsFolder "Media.css"
$mediaCssContent = @"
.media-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}
.media-card {
  width: 180px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background: #f9f9f9;
  padding: 10px;
}
.media-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
"@
Set-Content -Path $mediaCssPath -Value $mediaCssContent -Encoding UTF8

Write-Host "✅ Media.js y Media.css creados correctamente con placeholder local!"
