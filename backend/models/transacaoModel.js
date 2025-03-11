 const db = require('../config/db'); // Importa a conexão com o banco de dados

const TransacaoModel = {
  // Criar uma nova transação
  async create({
    transacao_descricao,
    transacao_valor,
    transacao_remetente_id,
    transacao_metodo_pagamento_id,
    transacao_parcelamento_id,
    transacao_conta_id,
    transacao_categoria_id,
    transacao_subcategoria_id,
    transacao_classe_id,
    transacao_subclasse_id,
    transacao_data,
    transacao_forma_pagamento_id,
  }) {
    const query = `
      INSERT INTO transacoes 
        (transacao_descricao, transacao_valor, transacao_remetente_id, transacao_metodo_pagamento_id, 
        transacao_parcelamento_id, transacao_conta_id, transacao_categoria_id, transacao_subcategoria_id, 
        transacao_classe_id, transacao_subclasse_id, transacao_data, transacao_forma_pagamento_id)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *`;
    
    const values = [
      transacao_descricao,
      transacao_valor,
      transacao_remetente_id,
      transacao_metodo_pagamento_id,
      transacao_parcelamento_id,
      transacao_conta_id,
      transacao_categoria_id,
      transacao_subcategoria_id,
      transacao_classe_id,
      transacao_subclasse_id,
      transacao_data,
      transacao_forma_pagamento_id,
    ];
    
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Obter todas as transações
  async getAll() {
    const query = `SELECT * FROM view_transacoes`; // Utiliza uma VIEW para otimizar a consulta
    const result = await db.query(query);
    return result.rows;
  },

  // Obter uma transação pelo ID
  async getById(transacao_id) {
    const query = `SELECT * FROM transacoes WHERE transacao_id = $1`;
    const result = await db.query(query, [transacao_id]);
    return result.rows[0] || null;
  },

  // Obter transações por remetente
  async getByRemetente(transacao_remetente_id) {
    const query = `SELECT * FROM transacoes WHERE transacao_remetente_id = $1`;
    const result = await db.query(query, [transacao_remetente_id]);
    return result.rows;
  },

  // Atualizar uma transação
  async update(transacao_id, { transacao_descricao, transacao_valor, transacao_data }) {
    const query = `
      UPDATE transacoes 
      SET transacao_descricao = $1, transacao_valor = $2, transacao_data = $3
      WHERE transacao_id = $4 
      RETURNING *`;
    
    const result = await db.query(query, [transacao_descricao, transacao_valor, transacao_data, transacao_id]);
    return result.rows[0] || null;
  },

  // Excluir uma transação
  async delete(transacao_id) {
    const query = `DELETE FROM transacoes WHERE transacao_id = $1 RETURNING *`;
    const result = await db.query(query, [transacao_id]);
    return result.rows[0] || null;
  },
};

module.exports = TransacaoModel;
