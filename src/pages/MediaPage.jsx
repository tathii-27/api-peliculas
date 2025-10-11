// MediaPage.jsx
import React from "react";
import MediaForm from "../components/MediaForm";
import MediaList from "../components/MediaList";

const MediaPage = () => (
  <div>
    <h2>Media (Películas y Series)</h2>
    <MediaForm />
    <MediaList />
  </div>
);
export default MediaPage;
