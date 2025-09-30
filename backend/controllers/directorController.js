// backend/controllers/directorController.js
export default class DirectorController {
    async getAll(req, res) {
        res.json({ message: "Obteniendo todos los directores" });
    }

    async getById(req, res) {
        const { id } = req.params;
        res.json({ message: `Obteniendo director con id ${id}` });
    }

    async create(req, res) {
        const data = req.body;
        res.json({ message: "Creando director", data });
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        res.json({ message: `Actualizando director con id ${id}`, data });
    }

    async delete(req, res) {
        const { id } = req.params;
        res.json({ message: `Eliminando director con id ${id}` });
    }
}

