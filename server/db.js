const Pool = require('pg').Pool;

const pool = new Pool ({
    user: "postgres",
    /* u302104969_economista */
    password: "1234",
    /* 0rgFinPessoal */
    host: "127.0.0.1",
    /* 127.0.0.1 */
    port: 5432,
    /* 3306 */
    database: "gerenciamentoFinanceiro"
    /*u302104969_gerFinanceiro*/
})

module.exports = pool;