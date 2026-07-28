const noteService = require('../services/noteService.js');

class noteController {
    async getNotes(req,res) {
        if(!req.session.userId) {
            return res.status(401).json("Please login into your account!");
        };

        try {
            const notes = await noteService.getNotes(req.session.userId);

            if(!notes) {
                return res.status(200).json("At the moment you don't have any notes!");
            } else {
                return res.status(201).json(notes);
            };
        } catch(e) {
            res.status(500).json("Something went wrong! : " + e.message);
        };
        
    };

    async createNote(req,res) {
        if(!req.session.userId) {
            return res.status(401).json("Please login into your account!");
        };

        if(!req.body.title && req.body.contents) {
            return res.status(400).json("Complete both title and content inputs!");
        };

        try {
            const note = await noteService.createNote(req.body.title,req.body.contents,req.session.userId);

            res.status(201).json("Your note succesfully was added!");
        } catch(e) {
            res.status(500).json("Something went wrong! : " + e.message);
        };
    };

    async editNote(req,res) {
        if(!req.session.userId) {
            return res.status(401).json("Please login into your account!");
        } else if(!req.body.noteId) {
            return res.status(404).json("Select a note!");
        } else if(!req.body.title) {
            return res.status(404).json("Enter a title!");
        } else if(!req.body.contents) {
            return res.status(404).json("Type something in description!");
        };

        try {
            const note = await noteService.editNote(req.body.title,req.body.contents,req.body.noteId,req.session.userId);

            if(note.rows[0] === undefined) {
                res.status(404).json("Note wasn't found!");
            } else if(note.rowCount) {
                res.status(200).json("Note was succesfully changed!");
            } else {
                throw new Error();
            };
        } catch(e) {
            res.status(500).json("Something went wrong! : " + e.message);
        }
    };

    async deleteNote(req,res) {
        if(!req.session.userId) {
            return res.status(401).json("Please login into your account!");
        } else if(!req.body.noteId) {
            return res.status(404).json("Select a note!");
        };

        try {
            const note = await noteService.deleteNote(req.body.noteId,req.session.userId);

            if(note.rows[0] === undefined) {
                res.status(404).json("Note wasn't found!");
            } else if(note.rowCount) {
                res.status(202).json("Your note was succesfully deleted!");
            } else {
                throw new Error();
            };
        } catch(e) {
            res.status(500).json("Something went wrong! : " + e.message);
        };
    };
};

module.exports = new noteController();