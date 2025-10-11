import React, { useState, useEffect } from 'react';
import './MoviesApp.css'; // Importa los estilos CSS externos

// Nombre clave para guardar los datos en el localStorage del navegador
const LOCAL_STORAGE_KEY = 'movies'; // Usamos 'movies' para que coincida con lo que tu navegador guardó

// FUNCIÓN DE INICIALIZACIÓN CON LAS URLs ESTABLES DE IMAGNES (Imgur)
const getInitialMovies = () => {
    const storedMovies = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMovies) {
        const movies = JSON.parse(storedMovies);
        
        // Si hay una lista guardada y NO está vacía, la usamos.
        if (movies.length > 0) {
            return movies;
        }
    }
    
    // Si NO hay lista guardada o está vacía, usamos esta lista inicial de 5 películas.
    return [
        { id: 1, title: 'El Origen', genre: 'Ciencia Ficción, Acción', year: 2010, imageUrl: 'https://i.imgur.com/k91Bw6Q.jpg' },
        { id: 2, title: 'Pulp Fiction', genre: 'Crimen, Drama', year: 1994, imageUrl: 'https://i.imgur.com/YwP2j05.jpg' },
        { id: 3, title: 'Interstellar', genre: 'Ciencia Ficción, Aventura', year: 2014, imageUrl: 'https://i.imgur.com/hI0Qe9k.jpg' },
        { id: 4, title: 'Parásitos', genre: 'Comedia negra, Thriller', year: 2019, imageUrl: 'https://i.imgur.com/4hD9QG2.jpg' },
        { id: 5, title: 'Mad Max: Furia en el Camino', genre: 'Acción, Aventura', year: 2015, imageUrl: 'https://i.imgur.com/zT9dD3n.jpg' }
    ];
};


function MoviesApp() {
  // 1. ESTADO: Lista principal de películas (usando la clave 'movies' de tu Local Storage)
  const [movies, setMovies] = useState(getInitialMovies());
  
  // 2. ESTADO: Valores del formulario de nueva película
  const [newMovieData, setNewMovieData] = useState({
    title: '', genre: '', year: '', imageUrl: '' 
  });

  // 3. ESTADO: Gestión del modo de edición
  const [editingMovie, setEditingMovie] = useState(null); 

  // 4. ESTADO: Gestión del término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  
  // --- FUNCIÓN CLAVE: GUARDAR EN LOCAL STORAGE ---
  // Se ejecuta cada vez que el array 'movies' cambia.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);


  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovieData(prevData => ({ ...prevData, [name]: value }));
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMovie = (e) => {
    e.preventDefault(); 
    // La validación de 'imageUrl' asegura que no se guarden películas sin imagen
    if (!newMovieData.title || !newMovieData.imageUrl) {
      alert("Debes ingresar el Título y la URL del Poster.");
      return;
    }

    const movieWithId = { 
      ...newMovieData, 
      id: Date.now(),
      year: parseInt(newMovieData.year) || null
    };

    setMovies(prevMovies => [...prevMovies, movieWithId]);
    setNewMovieData({ title: '', genre: '', year: '', imageUrl: '' });
  };

  const handleDelete = (idToDelete) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== idToDelete));
  };
  
  const handleEdit = (movie) => {
    setEditingMovie({ ...movie }); 
  };

  const handleSaveEdit = (e) => {
    e.preventDefault(); 
    
    const updatedMovies = movies.map(movie => 
      movie.id === editingMovie.id ? editingMovie : movie
    );
    
    setMovies(updatedMovies);
    setEditingMovie(null); 
  };

  const handleCancelEdit = () => {
      setEditingMovie(null); 
  };

  const filteredMovies = movies.filter(movie => {
    const searchLower = searchTerm.toLowerCase();

    if (!searchLower) return true;

    return (
      movie.title.toLowerCase().includes(searchLower) ||
      movie.genre.toLowerCase().includes(searchLower) ||
      String(movie.year).includes(searchLower) 
    );
  });


  return (
    <div className="movies-app-container"> 
      <h1>MoviesApp - Estilo Cuevana</h1>

      {/* --- FORMULARIO CONDICIONAL: EDICIÓN vs. AGREGAR --- */}
      {editingMovie ? (
        <form onSubmit={handleSaveEdit} className="edit-movie-form">
          <h3>Editando: {editingMovie.title}</h3>
          <input name="title" value={editingMovie.title} onChange={(e) => setEditingMovie({...editingMovie, title: e.target.value})} placeholder="Título" required />
          <input name="genre" value={editingMovie.genre} onChange={(e) => setEditingMovie({...editingMovie, genre: e.target.value})} placeholder="Género" />
          <input name="year" value={editingMovie.year} onChange={(e) => setEditingMovie({...editingMovie, year: e.target.value})} placeholder="Año" type="number" />
          <input name="imageUrl" value={editingMovie.imageUrl} onChange={(e) => setEditingMovie({...editingMovie, imageUrl: e.target.value})} placeholder="URL del Poster" required />
          
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={handleCancelEdit}>Cancelar</button>
        </form>
      ) : (
        <form onSubmit={handleAddMovie} className="add-movie-form">
          <input name="title" value={newMovieData.title} onChange={handleChange} placeholder="Título" required />
          <input name="genre" value={newMovieData.genre} onChange={handleChange} placeholder="Género" />
          <input name="year" value={newMovieData.year} onChange={handleChange} placeholder="Año" type="number" />
          <input name="imageUrl" value={newMovieData.imageUrl} onChange={handleChange} placeholder="URL del Poster (Imagen)" required />
          <button type="submit">Agregar Película</button>
        </form>
      )}
      
      {/* --- INPUT DE BÚSQUEDA --- */}
      <div className="search-section">
          <input 
              placeholder="Buscar título, género o año..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
          />
          <button>Buscar</button>
      </div>

      <hr />

      {/* --- VISUALIZACIÓN ESTILO CUEVANA --- */}
      {filteredMovies.length === 0 ? (
        <p className="no-movies-message">
          No se encontraron películas. Intenta agregar una o revisa tu búsqueda.
        </p>
      ) : (
        <div className="movies-grid"> 
          {filteredMovies.map((pelicula) => (
            <div key={pelicula.id} className="movie-card">
              <img 
                src={pelicula.imageUrl} 
                alt={pelicula.title} 
                className="movie-poster" 
              />
              <div className="movie-info">
                <h4>{pelicula.title} ({pelicula.year})</h4>
                <p>{pelicula.genre}</p>
                
                <div>
                  <button onClick={() => handleEdit(pelicula)}>Actualizar</button>
                  <button onClick={() => handleDelete(pelicula.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesApp;