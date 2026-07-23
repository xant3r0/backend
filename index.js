require('dotenv').config();
const db = require('./db.js');
const express = require("express");
const router = require('./routes/userRouter.js');
const session  = require('express-session');

const app = express();

app.use(express.json()).use(session({
    store: new (require('connect-pg-simple')(session))({
        pool: db,
        createTableIfMissing: true
    }),
    secret:String(process.env.SESS_SECRET),
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge:30 * 24 * 60 * 60 * 1000
    }
})).use('/api',router);


app.listen(process.env.PORT,() => {
    console.log(`Server started succesfully, port: ${process.env.PORT}`);
});