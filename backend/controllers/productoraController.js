import Productora from '../models/productoraModel.js';
import { Op } from 'sequelize';

export default class ProductoraController {
    /**
     * Obtiene todas las productoras registradas.
     * Ruta: GET /api/productoras
     */
    async getAll(req, res) {
        try {
            const productoras = await Productora.findAll({
                order: [['fecha_creacion', 'DESC']]
            });
            res.status(200).json(productoras);
        } catch (error) {
            console.error('Error al obtener productoras:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener productoras.', error: error.message });
        }
    }

    /**
     * Obtiene una productora por su ID.
     * Ruta: GET /api/productoras/:id
     */
    async getById(req, res) {
        try {
            const { id } = req.params;
            const productora = await Productora.findByPk(id);

            if (!productora) {
                return res.status(404).json({ message: `Productora con ID ${id} no encontrada.` });
            }
            res.status(200).json(productora);
        } catch (error) {
            console.error('Error al obtener productora por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
        }
    }

    /**
     * Crea una nueva productora.
     * Ruta: POST /api/productoras
     */
    async create(req, res) {
        try {
            const { nombre, estado, slogan, descripcion } = req.body;

            // 1. Validación de campos obligatorios
            if (!nombre) {
                return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
            }

            // 2. Validación de unicidad
            const existing = await Productora.findOne({ where: { nombre } });
            if (existing) {
                return res.status(409).json({ message: 'Ya existe una productora con este nombre.' });
            }

            // 3. Creación de productora
            const newProductora = await Productora.create({
                nombre,
                estado: estado || 'Activo', // Estado por defecto
                slogan,
                descripcion
            });

            res.status(201).json(newProductora); // 201 Created
        } catch (error) {
            console.error('Error al crear productora:', error);
            res.status(500).json({ message: 'Error interno del servidor al crear la productora.', error: error.message });
        }
    }

    /**
     * Actualiza una productora existente por su ID.
     * Ruta: PUT /api/productoras/:id
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, estado, slogan, descripcion } = req.body;

            const productora = await Productora.findByPk(id);
            if (!productora) {
                return res.status(404).json({ message: `Productora con ID ${id} no encontrada para actualizar.` });
            }

            // 1. Validación de unicidad del nombre al actualizar
            if (nombre && nombre !== productora.nombre) {
                const existing = await Productora.findOne({ 
                    where: { 
                        nombre, 
                        id: { [Op.ne]: id } // Que no sea el registro actual
                    } 
                });
                if (existing) {
                    return res.status(409).json({ message: 'Ya existe otra productora con este nombre.' });
                }
            }

            // 2. Actualizar campos
            productora.nombre = nombre || productora.nombre;
            productora.estado = estado || productora.estado;
            productora.slogan = slogan || productora.slogan;
            productora.descripcion = descripcion || productora.descripcion;
            productora.fecha_actualizacion = new Date();
            
            await productora.save();

            res.status(200).json({ message: 'Productora actualizada exitosamente.', productora });
        } catch (error) {
            console.error('Error al actualizar productora:', error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar la productora.', error: error.message });
        }
    }

    /**
     * Elimina una productora por su ID (Eliminación Lógica: cambia el estado).
     * Ruta: DELETE /api/productoras/:id
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            const productora = await Productora.findByPk(id);
            if (!productora) {
                return res.status(404).json({ message: `Productora con ID ${id} no encontrada para eliminar.` });
            }

            // Se realiza eliminación lógica actualizando el estado
            productora.estado = 'Inactivo';
            productora.fecha_actualizacion = new Date();
            await productora.save();

            res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error('Error al eliminar productora:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar la productora.', error: error.message });
        }
    }
}

