import React, { useState } from 'react';
import Media from './components/Media';
import Genero from './components/Genero';
import Director from './components/Director';
import Productora from './components/Productora';
import Tipo from './components/Tipo';

function App() {
  const [screen, setScreen] = useState('Media');

  const renderScreen = () => {
    switch(screen) {
      case 'Media': return <Media />;
      case 'Genero': return <Genero />;
      case 'Director': return <Director />;
      case 'Productora': return <Productora />;
      case 'Tipo': return <Tipo />;
      default: return <Media />;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['Media','Genero','Director','Productora','Tipo'].map(name => (
          <button key={name} onClick={() => setScreen(name)}>{name}</button>
        ))}
      </header>
      <main>{renderScreen()}</main>
    </div>
  );
}

export default App;
