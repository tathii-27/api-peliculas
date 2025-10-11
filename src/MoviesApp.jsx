import React, { useState } from 'react';

function MoviesApp() {
  // 1. ESTADO: Lista principal de películas (CRUD Base)
  const [movies, setMovies] = useState([
    { id: 1, title: 'El Origen', genre: 'Ciencia Ficción, Acción', year: 2010, imageUrl: 'https://m.media-amazon.com/images/I/91tO81hJ+EL.jpg' },
    { id: 2, title: 'Pulp Fiction', genre: 'Crimen, Drama', year: 1994, imageUrl: 'https://m.media-amazon.com/images/I/718y95zX-yL._AC_UF890,1000_QL80_.jpg' },
    { id: 3, title: 'Interstellar', genre: 'Ciencia Ficción, Aventura', year: 2014, imageUrl: 'https://m.media-amazon.com/images/I/A1F97w12BwL.jpg' }
  ]);
  
  // 2. ESTADO: Valores del formulario de nueva película (Crear)
  const [newMovieData, setNewMovieData] = useState({
    title: '', genre: '', year: '', imageUrl: '' 
  });

  // 3. ESTADO: Gestión del modo de edición (Actualizar)
  const [editingMovie, setEditingMovie] = useState(null); 

  // 4. ESTADO: Gestión del término de búsqueda (Buscar/Filtro)
  const [searchTerm, setSearchTerm] = useState('');

  // --- HANDLERS GENERALES ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovieData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // --- FUNCIONALIDAD C: AGREGAR / CREAR ---
  const handleAddMovie = (e) => {
    e.preventDefault(); 
    if (!newMovieData.title || !newMovieData.imageUrl) {
      alert("Debes ingresar el Título y la URL del Poster.");
      return;
    }

    const movieWithId = { 
      ...newMovieData, 
      id: Date.now(), // ID único simple
      year: parseInt(newMovieData.year) || null
    };

    setMovies(prevMovies => [...prevMovies, movieWithId]);
    setNewMovieData({ title: '', genre: '', year: '', imageUrl: '' });
  };

  // --- FUNCIONALIDAD D: ELIMINAR ---
  const handleDelete = (idToDelete) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== idToDelete));
  };
  
  // --- FUNCIONALIDAD U: ACTUALIZAR (Edición) ---
  const handleEdit = (movie) => {
    // Inicia el modo de edición y carga los datos de la película
    setEditingMovie({ ...movie }); 
  };

  const handleSaveEdit = (e) => {
    e.preventDefault(); 
    
    // Mapea la lista actual y reemplaza el objeto editado por el nuevo objeto
    const updatedMovies = movies.map(movie => 
      movie.id === editingMovie.id ? editingMovie : movie
    );
    
    setMovies(updatedMovies);
    setEditingMovie(null); // Sale del modo de edición
  };

  const handleCancelEdit = () => {
      setEditingMovie(null); // Sale del modo de edición sin guardar
  };

  // --- FUNCIONALIDAD R: BUSCAR (Filtro) ---
  const filteredMovies = movies.filter(movie => {
    const searchLower = searchTerm.toLowerCase();

    if (!searchLower) {
      return true; // Muestra todo si el campo está vacío
    }

    // Filtra por título, género o año
    return (
      movie.title.toLowerCase().includes(searchLower) ||
      movie.genre.toLowerCase().includes(searchLower) ||
      String(movie.year).includes(searchLower) 
    );
  });


  return (
    <div className="movies-app-container" style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <h1 style={{ color: '#FF0000', textAlign: 'center', marginBottom: '30px' }}>MoviesApp - Estilo Cuevana</h1>

      {/* --- FORMULARIO CONDICIONAL: EDICIÓN vs. AGREGAR --- */}
      {editingMovie ? (
        // --- MODO EDICIÓN (Actualizar) ---
        <form onSubmit={handleSaveEdit} className="edit-movie-form" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', backgroundColor: '#2a64b2', padding: '15px', borderRadius: '5px', marginBottom: '30px' }}>
          <h3 style={{ width: '100%', margin: 0, color: 'white' }}>Editando: {editingMovie.title}</h3>
          <input name="title" value={editingMovie.title} onChange={(e) => setEditingMovie({...editingMovie, title: e.target.value})} placeholder="Título" required style={{ flex: '1 1 200px', padding: '10px' }} />
          <input name="genre" value={editingMovie.genre} onChange={(e) => setEditingMovie({...editingMovie, genre: e.target.value})} placeholder="Género" style={{ flex: '1 1 150px', padding: '10px' }} />
          <input name="year" value={editingMovie.year} onChange={(e) => setEditingMovie({...editingMovie, year: e.target.value})} placeholder="Año" type="number" style={{ flex: '1 1 80px', padding: '10px' }} />
          <input name="imageUrl" value={editingMovie.imageUrl} onChange={(e) => setEditingMovie({...editingMovie, imageUrl: e.target.value})} placeholder="URL del Poster" required style={{ flex: '2 1 300px', padding: '10px' }} />
          
          <button type="submit" style={{ flex: '1 1 auto', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            Guardar Cambios
          </button>
          <button type="button" onClick={handleCancelEdit} style={{ flex: '1 1 auto', backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            Cancelar
          </button>
        </form>
      ) : (
        // --- MODO CREAR (Agregar) ---
        <form onSubmit={handleAddMovie} className="add-movie-form" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', backgroundColor: '#333', padding: '15px', borderRadius: '5px', marginBottom: '30px' }}>
          <input name="title" value={newMovieData.title} onChange={handleChange} placeholder="Título" required style={{ flex: '1 1 200px', padding: '10px' }} />
          <input name="genre" value={newMovieData.genre} onChange={handleChange} placeholder="Género" style={{ flex: '1 1 150px', padding: '10px' }} />
          <input name="year" value={newMovieData.year} onChange={handleChange} placeholder="Año" type="number" style={{ flex: '1 1 80px', padding: '10px' }} />
          <input name="imageUrl" value={newMovieData.imageUrl} onChange={handleChange} placeholder="URL del Poster (Imagen)" required style={{ flex: '2 1 300px', padding: '10px' }} />
          <button type="submit" style={{ flex: '1 1 auto', backgroundColor: '#FF0000', color: 'white', border: 'none', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            Agregar Película
          </button>
        </form>
      )}
      
      {/* --- INPUT DE BÚSQUEDA (R - Leer/Filtrar) --- */}
      <div style={{ padding: '10px 0', marginBottom: '20px' }}>
          <input 
              placeholder="Buscar título, género o año..." 
              value={searchTerm} // Vincula el valor al estado
              onChange={handleSearchChange} // Captura los cambios y dispara el filtro
              style={{ width: 'calc(100% - 100px)', padding: '10px' }}
          />
          <button style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#444', color: 'white', border: 'none' }}>Buscar</button>
      </div>

      <hr style={{ borderTop: '1px solid #444', margin: '20px 0' }}/>

      {/* --- VISUALIZACIÓN ESTILO CUEVANA (Grilla de Pósters) --- */}
      {/* Usa 'filteredMovies' para mostrar el resultado de la búsqueda */}
      {filteredMovies.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
          No se encontraron películas. Intenta agregar una o revisa tu búsqueda.
        </p>
      ) : (
        <div className="movies-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
        }}> 
          {filteredMovies.map((pelicula) => (
            <div key={pelicula.id} className="movie-card" style={{ 
              backgroundColor: '#1c1c1c', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.8)',
              transition: 'transform 0.2s' 
            }}>
              <img 
                src={pelicula.imageUrl} 
                alt={pelicula.title} 
                className="movie-poster" 
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div className="movie-info" style={{ padding: '10px' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{pelicula.title} ({pelicula.year})</h4>
                <p style={{ margin: '0', fontSize: '0.9em', color: '#aaa' }}>{pelicula.genre}</p>
                
                {/* Botones de Actualizar y Eliminar (CRUD) */}
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => handleEdit(pelicula)} style={{ backgroundColor: '#2a64b2', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}>
                    Actualizar
                  </button>
                  <button onClick={() => handleDelete(pelicula.id)} style={{ backgroundColor: '#cc0000', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}>
                    Eliminar
                  </button>
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