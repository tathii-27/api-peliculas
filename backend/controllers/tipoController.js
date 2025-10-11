import Tipo from '../models/tipoModel.js';
import { Op } from 'sequelize';

export default class TipoController {
    /**
     * Obtiene todos los tipos de medio registrados.
     * Ruta: GET /api/tipos
     */
    async getAll(req, res) {
        try {
            const tipos = await Tipo.findAll({
                order: [['fecha_creacion', 'DESC']]
            });
            res.status(200).json(tipos);
        } catch (error) {
            console.error('Error al obtener tipos:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener tipos.', error: error.message });
        }
    }

    /**
     * Obtiene un tipo por su ID.
     * Ruta: GET /api/tipos/:id
     */
    async getById(req, res) {
        try {
            const { id } = req.params;
            const tipo = await Tipo.findByPk(id);

            if (!tipo) {
                return res.status(404).json({ message: `Tipo con ID ${id} no encontrado.` });
            }
            res.status(200).json(tipo);
        } catch (error) {
            console.error('Error al obtener tipo por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
        }
    }

    /**
     * Crea un nuevo tipo de medio.
     * Ruta: POST /api/tipos
     */
    async create(req, res) {
        try {
            const { nombre, descripcion } = req.body;

            // 1. Validación de campos obligatorios
            if (!nombre) {
                return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
            }

            // 2. Validación de unicidad
            const existing = await Tipo.findOne({ where: { nombre } });
            if (existing) {
                return res.status(409).json({ message: 'Ya existe un tipo de medio con este nombre.' });
            }

            // 3. Creación del tipo
            const newTipo = await Tipo.create({
                nombre,
                descripcion
                // Nota: Los tipos no suelen tener un estado, pero si lo requiere el modelo, se puede añadir aquí.
            });

            res.status(201).json(newTipo); // 201 Created
        } catch (error) {
            console.error('Error al crear tipo:', error);
            res.status(500).json({ message: 'Error interno del servidor al crear el tipo.', error: error.message });
        }
    }

    /**
     * Actualiza un tipo existente por su ID.
     * Ruta: PUT /api/tipos/:id
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;

            const tipo = await Tipo.findByPk(id);
            if (!tipo) {
                return res.status(404).json({ message: `Tipo con ID ${id} no encontrado para actualizar.` });
            }

            // 1. Validación de unicidad del nombre al actualizar
            if (nombre && nombre !== tipo.nombre) {
                const existing = await Tipo.findOne({ 
                    where: { 
                        nombre, 
                        id: { [Op.ne]: id } // Que no sea el registro actual
                    } 
                });
                if (existing) {
                    return res.status(409).json({ message: 'Ya existe otro tipo de medio con este nombre.' });
                }
            }

            // 2. Actualizar campos
            tipo.nombre = nombre || tipo.nombre;
            tipo.descripcion = descripcion || tipo.descripcion;
            tipo.fecha_actualizacion = new Date();
            
            await tipo.save();

            res.status(200).json({ message: 'Tipo actualizado exitosamente.', tipo });
        } catch (error) {
            console.error('Error al actualizar tipo:', error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar el tipo.', error: error.message });
        }
    }

    /**
     * Elimina un tipo por su ID (Eliminación Física).
     * Ruta: DELETE /api/tipos/:id
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            // Se realiza eliminación física
            const deletedCount = await Tipo.destroy({ where: { id } });

            if (deletedCount === 0) {
                return res.status(404).json({ message: `Tipo con ID ${id} no encontrado para eliminar.` });
            }

            res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error('Error al eliminar tipo:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar el tipo.', error: error.message });
        }
    }
}
