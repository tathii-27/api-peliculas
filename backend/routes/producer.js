// backend/routes/producer.js
import express from 'express';
import ProducerController from '../controllers/producerController.js';

const router = express.Router();
const producerController = new ProducerController();

router.get('/', producerController.getAll.bind(producerController));
router.get('/:id', producerController.getById.bind(producerController));
router.post('/', producerController.create.bind(producerController));
router.put('/:id', producerController.update.bind(producerController));
router.delete('/:id', producerController.delete.bind(producerController));

export default router;

