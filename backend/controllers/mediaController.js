import Media from '../models/mediaModel.js';
import Genero from '../models/generoModel.js';
import Director from '../models/director.js';
import Productora from '../models/productoraModel.js';
import Tipo from '../models/tipoModel.js';
import { Op } from 'sequelize';

// Función auxiliar para verificar la existencia de IDs de lookups
const validateLookups = async (generoId, directorId, productoraId, tipoId) => {
    const lookups = [
        { model: Genero, id: generoId, name: 'Género' },
        { model: Director, id: directorId, name: 'Director' },
        { model: Productora, id: productoraId, name: 'Productora' },
        { model: Tipo, id: tipoId, name: 'Tipo' }
    ];

    for (const { model, id, name } of lookups) {
        if (!id) continue;
        const item = await model.findByPk(id);
        if (!item || (name !== 'Tipo' && item.estado !== 'Activo')) {
            // El estado 'Activo' solo se requiere para Género, Director y Productora. Tipo es siempre válido.
            return { valid: false, message: `${name} con ID ${id} no encontrado o inactivo.` };
        }
    }
    return { valid: true };
};

export default class MediaController {
    /**
     * Obtiene todos los medios, incluyendo información de lookups.
     * Ruta: GET /api/media
     */
    async getAll(req, res) {
        try {
            const mediaItems = await Media.findAll({
                include: [
                    { model: Genero, attributes: ['nombre'] },
                    { model: Director, attributes: ['nombres'] },
                    { model: Productora, attributes: ['nombre'] },
                    { model: Tipo, attributes: ['nombre'] }
                ],
                order: [['fecha_creacion', 'DESC']]
            });
            res.status(200).json(mediaItems);
        } catch (error) {
            console.error('Error al obtener medios:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener los medios.', error: error.message });
        }
    }

    /**
     * Obtiene un medio por su Serial.
     * Ruta: GET /api/media/:serial
     */
    async getById(req, res) {
        try {
            const { serial } = req.params;
            const mediaItem = await Media.findByPk(serial, {
                include: [Genero, Director, Productora, Tipo]
            });

            if (!mediaItem) {
                return res.status(404).json({ message: `Medio con Serial ${serial} no encontrado.` });
            }
            res.status(200).json(mediaItem);
        } catch (error) {
            console.error('Error al obtener medio por Serial:', error);
            res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
        }
    }

    /**
     * Crea un nuevo medio.
     * Ruta: POST /api/media
     */
    async create(req, res) {
        try {
            const { 
                titulo, sinopsis, url, imagen, anio_estreno, 
                genero, director, productora, tipo, estado 
            } = req.body;
            
            // 1. Validación de campos obligatorios
            const requiredFields = ['titulo', 'sinopsis', 'url', 'imagen', 'anio_estreno', 'genero', 'director', 'productora', 'tipo'];
            const missing = requiredFields.filter(field => !req.body[field]);
            if (missing.length > 0) {
                return res.status(400).json({ message: `Faltan campos obligatorios: ${missing.join(', ')}` });
            }

            // 2. Validación de Unicidad de URL (Requisito del proyecto)
            const existingUrl = await Media.findOne({ where: { url } });
            if (existingUrl) {
                return res.status(409).json({ message: "Error (409 Conflict): El URL de la película ya existe y debe ser único." });
            }

            // 3. Validación de Lookups (Género, Director, Productora, Tipo)
            const validation = await validateLookups(genero, director, productora, tipo);
            if (!validation.valid) {
                return res.status(400).json({ message: validation.message });
            }

            // 4. Creación del medio
            const newMedia = await Media.create({
                titulo, sinopsis, url, imagen, anio_estreno,
                genero, director, productora, tipo, 
                estado: estado || 'Activo' // 'Activo' por defecto si no se especifica
            });
            
            res.status(201).json(newMedia); // 201 Created
        } catch (error) {
            console.error('Error al crear medio:', error);
            res.status(500).json({ message: 'Error interno del servidor al crear el medio.', error: error.message });
        }
    }

    /**
     * Actualiza un medio existente por su Serial.
     * Ruta: PUT /api/media/:serial
     */
    async update(req, res) {
        try {
            const { serial } = req.params;
            const { 
                titulo, sinopsis, url, imagen, anio_estreno, 
                genero, director, productora, tipo, estado 
            } = req.body;

            const mediaItem = await Media.findByPk(serial);
            if (!mediaItem) {
                return res.status(404).json({ message: `Medio con Serial ${serial} no encontrado para actualizar.` });
            }

            // 1. Validación de Unicidad de URL al actualizar
            if (url && url !== mediaItem.url) {
                const existingUrl = await Media.findOne({ 
                    where: { 
                        url, 
                        serial: { [Op.ne]: serial } // Que no sea el registro actual
                    } 
                });
                if (existingUrl) {
                    return res.status(409).json({ message: "Error (409 Conflict): El URL de la película ya existe en otro registro." });
                }
            }

            // 2. Validación de Lookups (si se proporcionan)
            const validation = await validateLookups(genero, director, productora, tipo);
            if (!validation.valid) {
                return res.status(400).json({ message: validation.message });
            }

            // 3. Actualizar campos
            mediaItem.titulo = titulo || mediaItem.titulo;
            mediaItem.sinopsis = sinopsis || mediaItem.sinopsis;
            mediaItem.url = url || mediaItem.url;
            mediaItem.imagen = imagen || mediaItem.imagen;
            mediaItem.anio_estreno = anio_estreno || mediaItem.anio_estreno;
            mediaItem.genero = genero || mediaItem.genero;
            mediaItem.director = director || mediaItem.director;
            mediaItem.productora = productora || mediaItem.productora;
            mediaItem.tipo = tipo || mediaItem.tipo;
            mediaItem.estado = estado || mediaItem.estado;
            
            await mediaItem.save();

            res.status(200).json({ message: 'Medio actualizado exitosamente.', media: mediaItem });
        } catch (error) {
            console.error('Error al actualizar medio:', error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar el medio.', error: error.message });
        }
    }

    /**
     * Elimina un medio por su Serial (Eliminación Física).
     * Ruta: DELETE /api/media/:serial
     */
    async delete(req, res) {
        try {
            const { serial } = req.params;

            // Se realiza eliminación física
            const deletedCount = await Media.destroy({ where: { serial } });

            if (deletedCount === 0) {
                return res.status(404).json({ message: `Medio con Serial ${serial} no encontrado para eliminar.` });
            }

            res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error('Error al eliminar medio:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar el medio.', error: error.message });
        }
    }
}
