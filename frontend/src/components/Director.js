import React from 'react';
import data from '../data/directors.json';

export default function Director() {
  return (
    <div>
      <h2>Director</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', width: '220px' }}><p><strong>Nombre:</strong> {item.name}</p><p><strong>Estado:</strong> {item.status}</p>          </div>
        ))}
      </div>
    </div>
  );
}
