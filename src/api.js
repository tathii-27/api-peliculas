// src/api.js

// Datos simulados
export let genresData = [
  { id: 1, name: "Acción", status: "Activo" },
  { id: 2, name: "Drama", status: "Activo" },
];

export let directorsData = [
  { id: 1, name: "Steven Spielberg", status: "Activo" },
  { id: 2, name: "Christopher Nolan", status: "Activo" },
];

export let producersData = [
  { id: 1, name: "Warner Bros", status: "Activo", slogan: "Entertainment", description: "Productora grande" },
];

export let typesData = [
  { id: 1, name: "Película", description: "Producción cinematográfica" },
  { id: 2, name: "Serie", description: "Producción de serie" },
];

export let mediaData = [
  {
    id: 1,
    serial: "001",
    title: "Inception",
    synopsis: "Sueños dentro de sueños",
    url: "http://example.com/inception",
    image: "http://example.com/inception.jpg",
    releaseYear: 2010,
    genre: "Acción",
    director: "Christopher Nolan",
    producer: "Warner Bros",
    type: "Película",
  },
];
