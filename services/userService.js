const db = require('../db.js');
const bcrypt = require('bcrypt');

class userService {

    async changePassword(username,userpass,newpass) {
        try {
            const user = await this.signIn(username,userpass);

            if(user.rows[0] === undefined) {
                throw new Error("404");
            };
                    
            const matched = await bcrypt.compare(userpass,user.rows[0].userpass);
        
            if(!matched) {
                throw new Error("401");
            };

            if(!this.validatePassword(newpass)) {
                throw new Error("405");
            }

            const newHashPass = await bcrypt.hash(newpass,10);

            await db.query(`UPDATE users SET userpass = $1 WHERE username = $2`,[newHashPass,username]);

        } catch(e) {
            throw new Error(e.message);
        }
    }

    async deleteUser(username, userpass) {
        try {
            const user = await this.signIn(username,userpass);

            if(user.rows[0] === undefined) {
                throw new Error("404");
            };
                    
            const matched = await bcrypt.compare(userpass,user.rows[0].userpass);
        
            if(!matched) {
                throw new Error("401");
            };

            await db.query(`DELETE FROM users WHERE username = $1`,[username]);

        } catch(e) {
            throw new Error(e.message);
        }
        
    }

    validateUsername(username) {
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
        return regex.test(username);
    };

    validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    async signIn(username) {

        try {
            const result = await db.query(`SELECT username,userpass,userid FROM users WHERE username = $1;`,[username]);
            return result;
        } catch {
            throw new Error("Something bad happend!");
        };
    };

    async signUp(username,userpass) {
        
        if(!this.validateUsername(username) || !this.validatePassword(userpass)) {
            throw new Error("Try another username and/or password!");
        };

        try {
            const unique = await db.query(`SELECT username FROM users WHERE username = $1`,[username]);

            if(unique.rows[0]) {
                throw new Error("User with this username already exists!");
            } else {
                const hashPass = await bcrypt.hash(userpass,10);
                const result = await db.query(`INSERT INTO users (username,userpass,createdat) VALUES ($1, $2, NOW());`,[username, hashPass]);

                return result;
            };

        } catch(e) {
            throw new Error(e.message);
        };
    };
};

module.exports = new userService();