const Router = require('express');
const noteController = require('../controllers/noteController.js');
const authMiddleware = require('../middleware/auth.js');
const errorMiddleware = require('../middleware/error.js');

const noteRouter = new Router();

noteRouter.get('/notes',authMiddleware,errorMiddleware,noteController.getNotes);
noteRouter.post('/notes',authMiddleware,errorMiddleware,noteController.createNote);
noteRouter.put('/notes/:id',authMiddleware,errorMiddleware,noteController.editNote);
noteRouter.delete('/notes/:id',authMiddleware,errorMiddleware,noteController.deleteNote);

module.exports = noteRouter; 