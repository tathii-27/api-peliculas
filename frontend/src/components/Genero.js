import React from 'react';
import data from '../data/genres.json';

export default function Genero() {
  return (
    <div>
      <h2>Genero</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', width: '220px' }}><p><strong>Nombre:</strong> {item.name}</p><p><strong>Estado:</strong> {item.status}</p><p><strong>Descripción:</strong> {item.description}</p>          </div>
        ))}
      </div>
    </div>
  );
}
