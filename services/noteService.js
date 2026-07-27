const db = require('../db.js');

class noteService {
    async getNotes(id) {
        try {
            const notes = await db.query('SELECT * FROM notes WHERE userid = $1',[id]);

            return notes.rows[0];
        } catch(e) {
            throw new Error("Something bad happened! : " + e.message);
        };
    };

    async createNote(title,contents,id) {
        try {
            const note = db.query('INSERT INTO notes (title,contents,createdat,userid) VALUES ($1,$2,NOW(),$3)',[title,contents,id]);

            return note;
        } catch(e) {
            throw new Error("Something bad happened! : " + e.message);
        };
    };

    async editNote(title,contents,noteid,userid) {
        try {
            const note = await db.query("UPDATE notes SET title = $1, contents = $2 WHERE noteid = $3 AND userid = $4 RETURNING *",[title,contents,noteid,userid]);

            return note;
        } catch(e) {
            throw new Error("Something bad happened! : " + e.message);
        };
    };

    async deleteNote(noteid,userid) {
        try {
            const note = await db.query("DELETE FROM notes WHERE noteid = $1 and userid = $2 RETURNING *",[noteid,userid]);

            return note;
        } catch(e) {
            throw new Error("Something bad happened! : " + e.message);
        };
    };
};

module.exports = new noteService();