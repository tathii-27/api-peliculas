import Director from '../models/director.js';
import { Op } from 'sequelize';

export default class DirectorController {
    /**
     * Obtiene todos los directores activos.
     * Ruta: GET /api/directores
     */
    async getAll(req, res) {
        try {
            // Encuentra todos los directores cuyo estado sea 'Activo'
            const directores = await Director.findAll({
                where: {
                    estado: 'Activo'
                },
                order: [['nombres', 'ASC']]
            });
            res.status(200).json(directores);
        } catch (error) {
            console.error('Error al obtener directores:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener los directores.', error: error.message });
        }
    }

    /**
     * Obtiene un director por su ID.
     * Ruta: GET /api/directores/:id
     */
    async getById(req, res) {
        try {
            const { id } = req.params;
            const director = await Director.findByPk(id);

            if (!director) {
                return res.status(404).json({ message: `Director con ID ${id} no encontrado.` });
            }
            res.status(200).json(director);
        } catch (error) {
            console.error('Error al obtener director por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
        }
    }

    /**
     * Crea un nuevo director.
     * Ruta: POST /api/directores
     */
    async create(req, res) {
        try {
            const { nombres, estado } = req.body;
            
            if (!nombres) {
                return res.status(400).json({ message: 'El campo "nombres" es obligatorio.' });
            }

            // Validación de unicidad
            const exists = await Director.findOne({ where: { nombres } });
            if (exists) {
                return res.status(409).json({ message: `El director "${nombres}" ya existe.` });
            }

            const newDirector = await Director.create({ 
                nombres, 
                estado: estado || 'Activo' 
            });
            
            res.status(201).json(newDirector); // 201 Created
        } catch (error) {
            console.error('Error al crear director:', error);
            res.status(500).json({ message: 'Error interno del servidor al crear el director.', error: error.message });
        }
    }

    /**
     * Actualiza un director existente por su ID.
     * Ruta: PUT /api/directores/:id
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombres, estado } = req.body;

            const director = await Director.findByPk(id);
            if (!director) {
                return res.status(404).json({ message: `Director con ID ${id} no encontrado para actualizar.` });
            }

            // Validación de unicidad al actualizar
            if (nombres && nombres !== director.nombres) {
                const exists = await Director.findOne({ 
                    where: { 
                        nombres, 
                        id: { [Op.ne]: id } // Que no sea el registro actual
                    } 
                });
                if (exists) {
                    return res.status(409).json({ message: `El nombre "${nombres}" ya está asignado a otro director.` });
                }
            }

            // Actualiza solo los campos proporcionados
            director.nombres = nombres || director.nombres;
            director.estado = estado || director.estado;
            
            await director.save();

            res.status(200).json({ message: 'Director actualizado exitosamente.', director });
        } catch (error) {
            console.error('Error al actualizar director:', error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar el director.', error: error.message });
        }
    }

    /**
     * Elimina un director por su ID (Eliminación Física).
     * Ruta: DELETE /api/directores/:id
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            // Se realiza eliminación física
            const deletedCount = await Director.destroy({ where: { id } });

            if (deletedCount === 0) {
                return res.status(404).json({ message: `Director con ID ${id} no encontrado para eliminar.` });
            }

            res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error('Error al eliminar director:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar el director.', error: error.message });
        }
    }
}
