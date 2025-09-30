// backend/routes/genre.js
import express from 'express';
import GenreController from '../controllers/genreController.js';

const router = express.Router();
const genreController = new GenreController();

router.get('/', genreController.getAll.bind(genreController));
router.get('/:id', genreController.getById.bind(genreController));
router.post('/', genreController.create.bind(genreController));
router.put('/:id', genreController.update.bind(genreController));
router.delete('/:id', genreController.delete.bind(genreController));

export default router;

