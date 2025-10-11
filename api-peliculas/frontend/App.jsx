import React, { useEffect, useState } from 'react';

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Películas</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;
