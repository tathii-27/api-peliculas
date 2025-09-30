// backend/routes/type.js
import express from 'express';
import TypeController from '../controllers/typeController.js';

const router = express.Router();
const typeController = new TypeController();

router.get('/', typeController.getAll.bind(typeController));
router.get('/:id', typeController.getById.bind(typeController));
router.post('/', typeController.create.bind(typeController));
router.put('/:id', typeController.update.bind(typeController));
router.delete('/:id', typeController.delete.bind(typeController));

export default router;
