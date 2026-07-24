const db = require('../db.js');

class noteService {
    async getNotes(id) {
        try {
            const notes = await db.query('SELECT * FROM note WHERE userid = $1',[id]);

            return notes.rows[0];
        } catch(e) {
            throw new Error("Something bad happened! : " + e.message);
        };
    };

    async createNote() {
        
    };

    async editNote() {
        
    };

    async deleteNote() {
        
    };
};

module.exports = new noteService();