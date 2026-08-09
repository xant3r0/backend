const userService = require('../services/userService.js');
const bcrypt = require('bcrypt');

class userController {

    async logOut(req,res,next) {
        await req.session.destroy(e => {
            if(e) {
                const err = new Error("Something went wrong on the server, please try again later!");
                err.statusCode = 500;
                err.orig = e;
                return next(err);
            };

            res.clearCookie("connect.sid");

            res.sendStatus(204);
        });
    };

    async changePassword(req,res,next) {

        const { username, userpass, newpass } = req.body;

        try {
            await userService.changePassword(username,userpass,newpass);

            await req.session.regenerate( async (e) => {
                if(e) {
                    const err = new Error("Something went wrong on the server, please try again later!");
                    err.statusCode = 500;
                    err.orig = e;
                    return next(err);
                };

                req.session.userId = await userService.findUserId(username);
                req.session.username = username;

                res.status(200).json({success:true,message:"Your password has succesfully changed!",data:null});
            });
        } catch(e) {
            return next(e);
        };
    };

    async deleteUser(req,res,next) {

        const { username, userpass } = req.body;

        try {
            await userService.deleteUser(username,userpass);
            await req.session.destroy(e => {
                if(e) {
                    const err = new Error("Something went wrong on the server, please try again later!");
                    err.statusCode = 500;
                    err.orig = e;
                    return next(err);
                };

                res.clearCookie("connect.sid");
                res.sendStatus(204);
            });
        } catch(e) {
            return next(e);
        };
    };

    async signIn(req,res,next) {

        const { username, userpass } = req.body;

        try {

            await userService.auth(username,userpass);
            
            await req.session.regenerate( async (e) => {
                if(e) {
                    const err = new Error("Something went wrong on the server, please try again later!");
                    err.statusCode = 500;
                    err.orig = e;
                    return next(err);
                };

                req.session.userId = await userService.findUserId(username);
                req.session.username = username;

                return res.status(200).json({success:true,message:"You logged in succesfully!",data:{"id":user.userid,"username":user.username}});
            });

        } catch(e) {
            return next(e);
        };
    };

    async signUp(req,res,next) {
        const { username, userpass } = req.body;

        try {
            const user = await userService.signUp(username,userpass);
            res.status(201).json({success:true,message:"User created succesfully!",data:{"id":user.userid,"username":user.username}});
        } catch(e) {
            return next(e);
        };
    };
};

module.exports = new userController();