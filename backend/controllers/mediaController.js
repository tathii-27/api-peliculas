// backend/controllers/mediaController.js
export default class MediaController {
    // Obtener todos los medios
    async getAll(req, res) {
        res.json({ message: "Obteniendo todos los medios" });
    }

    // Obtener medio por ID
    async getById(req, res) {
        const { id } = req.params;
        res.json({ message: `Obteniendo medio con id ${id}` });
    }

    // Crear un nuevo medio
    async create(req, res) {
        const data = req.body;
        res.json({ message: "Creando medio", data });
    }

    // Actualizar medio por ID
    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        res.json({ message: `Actualizando medio con id ${id}`, data });
    }

    // Eliminar medio por ID
    async delete(req, res) {
        const { id } = req.params;
        res.json({ message: `Eliminando medio con id ${id}` });
    }
}

