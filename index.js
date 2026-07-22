require('dotenv').config();
const db = require('./db.js');
const express = require("express");
const router = require('./routes/userRouter.js');

const app = express();

app.use(express.json()).use('/api',router);


//const test = async () => { 
//    console.log(await db.query(`SELECT username,userpass FROM users WHERE username = 'volcu3232';`));
//}

//test();


app.listen(process.env.PORT,() => {
    console.log(`Server started succesfully, port: ${process.env.PORT}`);
});