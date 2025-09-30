// backend/controllers/producerController.js
export default class ProducerController {
    async getAll(req, res) {
        res.json({ message: "Obteniendo todos los productores" });
    }

    async getById(req, res) {
        const { id } = req.params;
        res.json({ message: `Obteniendo productor con id ${id}` });
    }

    async create(req, res) {
        const data = req.body;
        res.json({ message: "Creando productor", data });
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        res.json({ message: `Actualizando productor con id ${id}`, data });
    }

    async delete(req, res) {
        const { id } = req.params;
        res.json({ message: `Eliminando productor con id ${id}` });
    }
}

