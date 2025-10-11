import React, { useState } from 'react';

// Este componente maneja el formulario para agregar nuevas películas
const MovieForm = ({ onMovieAdded }) => {
    // Estado para capturar la entrada del formulario
    const [formData, setFormData] = useState({
        titulo: '',
        genero: '',
        anio: '',
        sinopsis: '',
        url: '', // Campo para la URL/ruta de la imagen
    });
    // Estado para manejar el feedback visual al usuario (cargando, éxito, error)
    const [submitStatus, setSubmitStatus] = useState(null); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');
        
        try {
            // Solicitud POST a la API
            const response = await fetch('http://localhost:5000/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Leer el error del servidor (si está disponible)
                const errorData = await response.json();
                throw new Error(errorData.error || \Error HTTP: \\);
            }

            // Película creada con éxito
            const newMovie = await response.json();
            setSubmitStatus('success');
            
            // Limpiar formulario y notificar al componente padre (MoviesApp)
            setFormData({ titulo: '', genero: '', anio: '', sinopsis: '', url: '' });
            onMovieAdded(newMovie); 

        } catch (err) {
            console.error("Error al agregar película:", err);
            setSubmitStatus('error');
        }
    };

    return (
        <form className="movie-form" onSubmit={handleSubmit}>
            <h3>Añadir Nueva Película</h3>
            
            <input 
                type="text" 
                name="titulo" 
                placeholder="Título" 
                value={formData.titulo} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="text" 
                name="genero" 
                placeholder="Género" 
                value={formData.genero} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="number" 
                name="anio" 
                placeholder="Año (e.g., 2024)" 
                value={formData.anio} 
                onChange={handleChange} 
                required 
            />
             <input 
                type="text" 
                name="url" 
                placeholder="URL/Ruta de Imagen (/assets/...)" 
                value={formData.url} 
                onChange={handleChange} 
                required 
            />
            <textarea 
                name="sinopsis" 
                placeholder="Sinopsis" 
                value={formData.sinopsis} 
                onChange={handleChange} 
                required 
            />
            
            <button type="submit" disabled={submitStatus === 'loading'}>
                {submitStatus === 'loading' ? 'Guardando...' : 'Guardar Película'}
            </button>

            {submitStatus === 'success' && <p style={{color: 'green'}}>¡Película añadida con éxito!</p>}
            {submitStatus === 'error' && <p style={{color: 'red'}}>Error al guardar. Revise la consola.</p>}
        </form>
    );
};

export default MovieForm;
