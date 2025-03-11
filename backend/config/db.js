const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    // user: "postgres", // usuario 
    // password: "1234", // senha
    // host: "127.0.0.1", // anfitriao
    // port: 5432, // porta no banco de dados
    // database: "gerenciamento_financeiro" // banco de dados
})
module.exports = pool;
// module.exports = {
//     query: (text, params) => pool.query(text, params),
// };