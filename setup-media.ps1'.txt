# Ruta de proyecto
$projectRoot = "C:\Users\ThinkPad\Downloads\api-peliculas\frontend"

# Crear carpetas si no existen
$componentsFolder = Join-Path $projectRoot "src\components"
if (-not (Test-Path $componentsFolder)) { New-Item -ItemType Directory -Path $componentsFolder | Out-Null }

$assetsFolder = Join-Path $projectRoot "public\assets"
if (-not (Test-Path $assetsFolder)) { New-Item -ItemType Directory -Path $assetsFolder | Out-Null }

# Crear un placeholder local si no existe
$placeholderPath = Join-Path $assetsFolder "placeholder.jpg"
if (-not (Test-Path $placeholderPath)) {
    # Crear un simple placeholder en blanco
    $bitmap = New-Object System.Drawing.Bitmap 180,270
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::DarkGray)
    $bitmap.Save($placeholderPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $graphics.Dispose()
    $bitmap.Dispose()
}

# Contenido de Media.js
$mediaJsContent = @"
import React, { useRef, useEffect } from 'react';
import './Media.css';

const media = [
  { id: 1, title: 'Avatar', year: 2009, genero: 'Acción', image: process.env.PUBLIC_URL + '/assets/avatar.jpg' },
  { id: 2, title: 'Matrix', year: 1999, genero: 'Ciencia Ficción', image: process.env.PUBLIC_URL + '/assets/matrix.jpg' },
  { id: 3, title: 'Inception', year: 2010, genero: 'Acción', image: process.env.PUBLIC_URL + '/assets/inception.jpg' },
  { id: 4, title: 'Titanic', year: 1997, genero: 'Drama', image: process.env.PUBLIC_URL + '/assets/titanic.jpg' },
  { id: 5, title: 'Interstellar', year: 2014, genero: 'Ciencia Ficción', image: process.env.PUBLIC_URL + '/assets/interstellar.jpg' },
  { id: 6, title: 'Avengers', year: 2012, genero: 'Acción', image: process.env.PUBLIC_URL + '/assets/avengers.jpg' }
];

const Media = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;
    const scrollStep = () => {
      if (!carousel) return;
      scrollAmount += 1;
      if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) scrollAmount = 0;
      carousel.scrollLeft = scrollAmount;
    };
    const interval = setInterval(scrollStep, 20);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => { carouselRef.current.scrollBy({ left: -240, behavior: 'smooth' }); };
  const scrollRight = () => { carouselRef.current.scrollBy({ left: 240, behavior: 'smooth' }); };

  return (
    <div className="cuevana-wrapper">
      <h2 className="carousel-title">Películas Populares</h2>
      <button className="arrow left-arrow" onClick={scrollLeft}>&lt;</button>
      <div className="media-container" ref={carouselRef}>
        {media.concat(media).map((item, index) => (
          <div key={index} className="media-card">
            <img src={item.image} alt={item.title} onError={(e)=>{e.target.src=process.env.PUBLIC_URL + '/assets/placeholder.jpg';}}/>
            <div className="media-info">
              <h3>{item.title}</h3>
              <p>{item.genero} - {item.year}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow right-arrow" onClick={scrollRight}>&gt;</button>
    </div>
  );
};

export default Media;
"@

# Guardar Media.js
$mediaJsPath = Join-Path $componentsFolder "Media.js"
$mediaJsContent | Out-File -Encoding UTF8 -FilePath $mediaJsPath

# Contenido Media.css
$mediaCssContent = @"
.cuevana-wrapper { position: relative; background-color: #0d0d0d; padding: 20px; color: #fff; overflow: hidden; }
.carousel-title { margin-bottom: 10px; font-size: 1.5rem; font-weight: bold; }
.media-container { display: flex; overflow-x: scroll; scroll-behavior: smooth; }
.media-card { min-width: 180px; margin-right: 10px; background-color: #1a1a1a; border-radius: 5px; overflow: hidden; }
.media-card img { width: 100%; height: auto; display: block; }
.media-info { padding: 5px; text-align: center; font-size: 0.9rem; }
.arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; color: #fff; font-size: 1.5rem; cursor: pointer; z-index: 10; }
.left-arrow { left: 0; }
.right-arrow { right: 0; }
"@

# Guardar Media.css
$mediaCssPath = Join-Path $componentsFolder "Media.css"
$mediaCssContent | Out-File -Encoding UTF8 -FilePath $mediaCssPath

Write-Host "¡Media.js y Media.css creados correctamente con placeholder local!"






