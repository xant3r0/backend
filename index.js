require('dotenv').config();
const db = require('./db.js');
const express = require("express");
const userRouter = require('./routes/userRouter.js');
const noteRouter = require('./routes/noteRouter.js');
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
        maxAge:30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
})).use('/auth',userRouter).use('/note',noteRouter);

//const test = async () => {
    //const note = await db.query(`INSERT INTO notes VALUES (16,'Nigger','Nigger',NOW(),29)`);
    //console.log(note);
//}


app.listen(process.env.PORT,() => {
    console.log(`Server started succesfully, port: ${process.env.PORT}`);
    //test();
});


//  To do:
//  1)CSRF protection;
//  2)Add rate limiting;
//  3)Avoid leaking stack traces(delete the errors logout on 500 status)