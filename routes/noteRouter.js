const Router = require('express');
const noteController = require('../controllers/noteController.js');

const noteRouter = new Router();

noteRouter.get('/notes',noteController.getNotes);
noteRouter.post('/notes',noteController.createNote);
noteRouter.put('/notes/:id',noteController.editNote);
noteRouter.delete('/notes/:id',noteController.deleteNote);

module.exports = noteRouter;