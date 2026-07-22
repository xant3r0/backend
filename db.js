const Pool = require('pg').Pool;
const pool = new Pool({
    user: String(process.env.USER),
    password: String(process.env.PASSWORD),
    host: String(process.env.HOST),
    port: process.env.DBPORT,
    database: String(process.env.DB)
});



module.exports = pool;