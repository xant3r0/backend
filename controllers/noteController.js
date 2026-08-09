const noteService = require('../services/noteService.js');

class noteController {
    async getNotes(req,res) {

        const { userId } = req.session; 

        try {
            const notes = await noteService.getNotes(userId);

            if(!notes.length) {
                return res.status(200).json({success:true,message:"At the moment you don't have any notes!"});
            } else {
                return res.status(200).json({success:true,message:notes});
            };
        } catch(e) {
            return next(e);
        };
        
    }; 

    async createNote(req,res) {

        const {title, contents} = req.body;
        const { userId } = req.session; 

        if(!title || !contents) {
            return res.status(400).json({success:false,message:"Complete both title and content inputs!"});
        };

        try {
            const note = await noteService.createNote(title,contents,userId);

            res.status(201).json({success:true,message:"Your note succesfully was added!"});
        } catch(e) {
            return next(e);
        };
    };

    async editNote(req,res) {
        const noteId = req.params.id;
        const {title, contents} = req.body;
        const { userId } = req.session; 

        if(!noteId || !title || !contents || !userId) {
            return res.status(400).json({success:false,message:"Bad request!"});
        };

        try {
            const note = await noteService.editNote(title,contents,noteId,userId);

            if(!note) {
                res.status(404).json({success:false,message:"Note wasn't found!"});
            } else {
                res.status(200).json({success:true,message:"Your note was succesfully updated!"});
            };
        } catch(e) {
            return next(e);
        }
    };

    async deleteNote(req,res) {
        const noteId = req.params.id;
        const { userId } = req.session; 

        if(!noteId) {
            return res.status(400).json({success:false,message:"Select a note!"});
        };

        try {
            const note = await noteService.deleteNote(noteId,userId);

            if(!note) {
                res.status(404).json({success:false,message:"Note wasn't found!"});
            } else {
                res.sendStatus(204);
            };
        } catch(e) {
            return next(e);
        };
    };
};

module.exports = new noteController();