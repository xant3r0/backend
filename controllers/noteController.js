const noteService = require('../services/noteService.js');

class noteController {
    async getNotes(req,res) {
        if(!req.session.userId) {
            console.log(req.session.userId);
            res.status(401).json("Please login into your account!");
        };

        try {
            const notes = await noteService.getNotes(req.session.userId);

            if(!notes) {
                res.status(200).json("At the moment you don't have any notes!");
            } else {
                res.status(201).json(notes);
            };
        } catch(e) {
            res.status(500).json("Something went wrong! : " + e.message);
        };
        
    }

    async createNote() {
        
    }

    async editNote() {
        
    }

    async deleteNote() {
        
    }
}

module.exports = new noteController();