const userService = require('../services/userService.js');
const bcrypt = require('bcrypt');

class userController {
    async changePassword(req,res) {
        try {
            await userService.changePassword(req.body.username,req.body.userpass,req.body.newpass);
            res.status(200).json("Your password has succesfully changed!");
        } catch(e) {
            if(e.message === "404") {
                res.status(404).json("User wasn't found!");
            } else if(e.message === "401") {
                res.status(401).json("Incorrect password!");
            } else if(e.message === "405") {
                res.status(405).json("Password you entered is too weak!");
            } else {
                console.log(e.message)
                res.status(500).json("Something went wrong1");
            }
        };
    };

    async deleteUser(req,res) {
        try {
            await userService.deleteUser(req.body.username,req.body.userpass);
            res.status(204).json("Your user account was succesfully deleted!");
        } catch(e) {
            if(e.message === "404") {
                res.status(404).json("User wasn't found!");
            } else if(e.message === "401") {
                res.status(401).json("Incorrect password!");
            } else {
                console.log(e.message)
                res.status(500).json("Something went wrong1");
            }
        };
    }

    async signIn(req,res) {

        try {
            const user = await userService.signIn(req.body.username);

            if(user.rows[0] === undefined) {
                return res.status(404).json("User wasn't found!");
            };
            
            const matched = await bcrypt.compare(req.body.userpass,user.rows[0].userpass);

            if(!matched) {
                return res.status(401).json("Password incorrect!");
            }

            return res.status(201).json(`Welcome back, ${user.rows[0].username}`);

        } catch(e) {
            res.status(500).json("Something went bad! :" + e.message);
        }
    };

    async signUp(req,res) {

        await userService.signUp(req.body.username,req.body.userpass);

        try {
            res.status(201).json("User created succesfully, now please login!!");
        } catch(e) {
            res.status(500).json(e.message);
        };

    };
};

module.exports = new userController();