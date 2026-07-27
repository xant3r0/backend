const Router = require('express');
const noteController = require('../controllers/noteController.js');

const noteRouter = new Router();

noteRouter.get('/getNotes',noteController.getNotes);
noteRouter.post('/addNote',noteController.createNote);
noteRouter.put('/editNote',noteController.editNote);
noteRouter.delete('/deleteNote',noteController.deleteNote);

module.exports = noteRouter;