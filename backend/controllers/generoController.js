import Genero from '../models/generoModel.js'; // Asumimos que el modelo será creado aquí
import { Op } from 'sequelize';

export default class GeneroController {
    /**
     * Obtiene todos los géneros activos.
     * Ruta: GET /api/generos
     */
    async getAll(req, res) {
        try {
            // Encuentra todos los géneros cuyo estado sea 'Activo'
            const generos = await Genero.findAll({
                where: {
                    estado: 'Activo' // Filtro por defecto para lookups
                },
                order: [['nombre', 'ASC']]
            });
            res.status(200).json(generos);
        } catch (error) {
            console.error('Error al obtener géneros:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener los géneros.', error: error.message });
        }
    }

    /**
     * Obtiene un género por su ID.
     * Ruta: GET /api/generos/:id
     */
    async getById(req, res) {
        try {
            const { id } = req.params;
            const genero = await Genero.findByPk(id);

            if (!genero) {
                return res.status(404).json({ message: `Género con ID ${id} no encontrado.` });
            }
            res.status(200).json(genero);
        } catch (error) {
            console.error('Error al obtener género por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
        }
    }

    /**
     * Crea un nuevo género.
     * Ruta: POST /api/generos
     */
    async create(req, res) {
        try {
            const { nombre, descripcion, estado } = req.body;
            
            if (!nombre || !descripcion) {
                return res.status(400).json({ message: 'Los campos "nombre" y "descripcion" son obligatorios.' });
            }

            // Validación de unicidad
            const exists = await Genero.findOne({ where: { nombre } });
            if (exists) {
                return res.status(409).json({ message: `El género "${nombre}" ya existe.` });
            }

            const newGenero = await Genero.create({ 
                nombre, 
                descripcion,
                estado: estado || 'Activo' 
            });
            
            res.status(201).json(newGenero); // 201 Created
        } catch (error) {
            console.error('Error al crear género:', error);
            res.status(500).json({ message: 'Error interno del servidor al crear el género.', error: error.message });
        }
    }

    /**
     * Actualiza un género existente por su ID.
     * Ruta: PUT /api/generos/:id
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion, estado } = req.body;

            const genero = await Genero.findByPk(id);
            if (!genero) {
                return res.status(404).json({ message: `Género con ID ${id} no encontrado para actualizar.` });
            }

            // Validación de unicidad al actualizar
            if (nombre && nombre !== genero.nombre) {
                const exists = await Genero.findOne({ 
                    where: { 
                        nombre, 
                        id: { [Op.ne]: id } // Que no sea el registro actual
                    } 
                });
                if (exists) {
                    return res.status(409).json({ message: `El nombre "${nombre}" ya está asignado a otro género.` });
                }
            }

            // Actualiza los campos proporcionados
            genero.nombre = nombre || genero.nombre;
            genero.descripcion = descripcion || genero.descripcion;
            genero.estado = estado || genero.estado;
            
            await genero.save();

            res.status(200).json({ message: 'Género actualizado exitosamente.', genero });
        } catch (error) {
            console.error('Error al actualizar género:', error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar el género.', error: error.message });
        }
    }

    /**
     * Elimina un género por su ID (Eliminación Física).
     * Ruta: DELETE /api/generos/:id
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            // Se realiza eliminación física
            const deletedCount = await Genero.destroy({ where: { id } });

            if (deletedCount === 0) {
                return res.status(404).json({ message: `Género con ID ${id} no encontrado para eliminar.` });
            }

            res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error('Error al eliminar género:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar el género.', error: error.message });
        }
    }
}
