// backend/routes/media.js
import express from 'express';
import MediaController from '../controllers/mediaController.js';

const router = express.Router();
const mediaController = new MediaController();

router.get('/', mediaController.getAll.bind(mediaController));
router.get('/:id', mediaController.getById.bind(mediaController));
router.post('/', mediaController.create.bind(mediaController));
router.put('/:id', mediaController.update.bind(mediaController));
router.delete('/:id', mediaController.delete.bind(mediaController));

export default router;

