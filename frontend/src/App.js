import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Media from "./components/Media";

function App() {
  const [screen, setScreen] = useState("Media");

  const renderScreen = () => {
    switch (screen) {
      case "Media":
      default:
        return <Media />;
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Cuevana-Style</span>
          <div>
            <button className="btn btn-outline-light me-2" onClick={() => setScreen("Media")}>Media</button>
            <button className="btn btn-outline-light" onClick={() => setScreen("Media")}>Películas</button>
          </div>
        </div>
      </nav>
      <div className="container-fluid p-4">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
