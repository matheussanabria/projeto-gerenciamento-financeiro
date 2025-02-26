const { Pool } = require('pg');
const pool = new Pool ({
    user: "postgres", // usuario 
    password: "1234", // senha
    host: "127.0.0.1", // anfitriao
    port: 5432, // porta no banco de dados
    database: "gerenciamento_financeiro" // banco de dados
})

module.exports = {
    query: (text, params) => pool.query(text, params),
};