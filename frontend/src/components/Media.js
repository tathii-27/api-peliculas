import React from 'react';
import data from '../data/movies.json';

export default function Media() {
  return (
    <div>
      <h2>Media</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', width: '220px' }}>            <img src={'/images/' + item.image} alt={item.title} width='200'/>
            <h3>{item.title}</h3>
            <p><strong>Género:</strong> {item.genre}</p>
            <p><strong>Director:</strong> {item.director}</p>
            <p><strong>Productora:</strong> {item.producer}</p>
            <p><strong>Tipo:</strong> {item.type}</p>
            <p><strong>Año:</strong> {item.year}</p>
            <p><strong>Sinopsis:</strong> {item.synopsis}</p>          </div>
        ))}
      </div>
    </div>
  );
}
