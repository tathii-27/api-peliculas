// backend/routes/director.js
import express from 'express';
import DirectorController from '../controllers/directorController.js';

const router = express.Router();
const directorController = new DirectorController();

router.get('/', directorController.getAll.bind(directorController));
router.get('/:id', directorController.getById.bind(directorController));
router.post('/', directorController.create.bind(directorController));
router.put('/:id', directorController.update.bind(directorController));
router.delete('/:id', directorController.delete.bind(directorController));

export default router;
