const Router = require('express');
const noteController = require('../controllers/noteController.js');
const authMiddleware = require('../middleware/auth.js');

const noteRouter = new Router();

noteRouter.get('/notes',authMiddleware,noteController.getNotes);
noteRouter.post('/notes',authMiddleware,noteController.createNote);
noteRouter.put('/notes/:id',authMiddleware,noteController.editNote);
noteRouter.delete('/notes/:id',authMiddleware,noteController.deleteNote);

module.exports = noteRouter;