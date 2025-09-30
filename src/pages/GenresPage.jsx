// GenresPage.jsx
import React from "react";
import GenreForm from "../components/GenreForm";
import GenreList from "../components/GenreList";

const GenresPage = () => (
  <div>
    <h2>Géneros</h2>
    <GenreForm />
    <GenreList />
  </div>
);
export default GenresPage;