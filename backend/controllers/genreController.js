// backend/controllers/genreController.js
export default class GenreController {
    async getAll(req, res) {
        res.json({ message: "Obteniendo todos los géneros" });
    }

    async getById(req, res) {
        const { id } = req.params;
        res.json({ message: `Obteniendo género con id ${id}` });
    }

    async create(req, res) {
        const data = req.body;
        res.json({ message: "Creando género", data });
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        res.json({ message: `Actualizando género con id ${id}`, data });
    }

    async delete(req, res) {
        const { id } = req.params;
        res.json({ message: `Eliminando género con id ${id}` });
    }
}

