import React from "react"; 
const media = [
  { id: 1, title: "Avatar", year: 2009, image: "https://via.placeholder.com/200x300", genero: "Acción" },
  { id: 2, title: "Matrix", year: 1999, image: "https://via.placeholder.com/200x300", genero: "Ciencia Ficción" },
  { id: 3, title: "Inception", year: 2010, image: "https://via.placeholder.com/200x300", genero: "Acción" },
  { id: 4, title: "Titanic", year: 1997, image: "https://via.placeholder.com/200x300", genero: "Drama" }
];
function Media() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Media</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {media.map(m => (
          <div key={m.id} className="bg-gray-800 text-white rounded shadow overflow-hidden hover:scale-105 transform transition duration-300">
            <img src={m.image} alt={m.title} className="w-full h-64 object-cover"/>
            <div className="p-2">
              <h2 className="font-semibold">{m.title}</h2>
              <p className="text-sm text-gray-300">{m.year} - {m.genero}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Media;
