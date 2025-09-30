// backend/controllers/typeController.js
export default class TypeController {
    async getAll(req, res) {
        res.json({ message: "Obteniendo todos los tipos de medio" });
    }

    async getById(req, res) {
        const { id } = req.params;
        res.json({ message: `Obteniendo tipo de medio con id ${id}` });
    }

    async create(req, res) {
        const data = req.body;
        res.json({ message: "Creando tipo de medio", data });
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        res.json({ message: `Actualizando tipo de medio con id ${id}`, data });
    }

    async delete(req, res) {
        const { id } = req.params;
        res.json({ message: `Eliminando tipo de medio con id ${id}` });
    }
}

