const db = require('../db.js');
const bcrypt = require('bcrypt');

class UserService {

    async findUserId(username) {
        const result = await db.query(`SELECT userid FROM users WHERE username = $1`,[username]);

        return result.rows[0].userid;
    };

    async findUser(username) {

        try {
            const result = await db.query(`SELECT username,userpass,userid FROM users WHERE username = $1`,[username]);
            return result.rows[0] || null;
        } catch(e) {
            
            this.wrapErr(e);

        };
    };

    existsUser(user) {
        if(user === null) {
            const err = new Error("User wasn't found!");
            err.statusCode = 404;
            throw err;
        };
    };

    async verifyPassword(user,userpass) {
        const matched = await bcrypt.compare(userpass,user.userpass);
        
        if(!matched) {
            const err = new Error("Wrong password!");
            err.statusCode = 401;
            throw err;
        };
    };

    wrapErr(e) {
        if(e.statusCode) {
            throw e;
        };

        const err = new Error("Something went wrong on the server, please try again later!");
        err.statusCode = 500;
        err.orig = e;
        throw err;
    };

    async auth(username,userpass) {
        const user = await this.findUser(username);

        this.existsUser(user);
                    
        await this.verifyPassword(user,userpass);

        return user;
    };

    async changePassword(username,userpass,newpass) {

        try {
            
            await this.auth(username,userpass);

            if(userpass === newpass) {
                const err = new Error("Use a new password!");
                err.statusCode = 400;
                throw err;
            };

            const newHashPass = await bcrypt.hash(newpass,10);

            const result = await db.query(`UPDATE users SET userpass = $1 WHERE username = $2 RETURNING userid,username`,[newHashPass,username]);

            if(result.rowCount === 0) {
                const err = new Error("Something went wrong on the server, please try again later!");
                err.statusCode = 500;
                throw err;
            };

            return result.rows[0];

        } catch(e) {

            this.wrapErr(e);

        };
    };

    async deleteUser(username, userpass) {

        try {
            
            await this.auth(username,userpass);

            const result = await db.query(`DELETE FROM users WHERE username = $1 RETURNING username,userid`,[username]);

            if(result.rowCount === 0) {
                const err = new Error("Something went wrong on the server, please try again later!");
                err.statusCode = 500;
                throw err;
            };

            return result.rows[0];

        } catch(e) {

            this.wrapErr(e);

        };
        
    };

    async signUp(username,userpass) {

        try {

            const hashPass = await bcrypt.hash(userpass,10);
            const result = await db.query(`INSERT INTO users (username,userpass,createdat) VALUES ($1, $2, NOW()) RETURNING userid, username, createdat`,[username, hashPass]);

            return result.rows[0];

        } catch(e) {

            if(e.code === '23505') {
                const err = new Error("User with this username already exists!");
                err.statusCode = 409;
                throw err;
            };

            this.wrapErr(e);

        };
    };
};

module.exports = new UserService();