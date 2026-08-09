const db = require('../db.js');

class noteService {

    wrapErr(e) {
        if(e.statusCode) {
            throw e;
        };

        const err = new Error("Something went wrong on the server, please try again later!");
        err.statusCode = 500;
        err.orig = e;
        throw err;
    };

    async getNotes(id) {
        try {
            const notes = await db.query('SELECT * FROM notes WHERE userid = $1',[id]);

            return notes.rows;
        } catch(e) {
            this.wrapErr(e);
        };
    }; 

    async createNote(title,contents,id) {
        try {
            const note = await db.query('INSERT INTO notes (title,contents,createdat,userid) VALUES ($1,$2,NOW(),$3) RETURNING noteid,title,contents,createdat',[title,contents,id]);

            return note.rows[0];
        } catch(e) {
            this.wrapErr(e);
        };
    };

    async editNote(title,contents,noteid,userid) {
        try {
            const note = await db.query("UPDATE notes SET title = $1, contents = $2 WHERE noteid = $3 AND userid = $4 RETURNING noteid,title,contents,createdat",[title,contents,noteid,userid]);

            return note.rows[0];
        } catch(e) {
            this.wrapErr(e);
        };
    };

    async deleteNote(noteid,userid) {
        try {
            const note = await db.query("DELETE FROM notes WHERE noteid = $1 and userid = $2 RETURNING noteid,title,contents,createdat",[noteid,userid]);

            return note.rows[0];
        } catch(e) {
            this.wrapErr(e);
        };
    };
};

module.exports = new noteService();