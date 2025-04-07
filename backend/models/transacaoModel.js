 const db = require('../config/db'); // Importa a conexão com o banco de dados

const TransacaoModel = {
  // Criar uma nova transação
  async create({
    transacao_descricao,
    transacao_valor,
    transacao_remetente_id,
    transacao_metodo_pagamento_id,
    transacao_forma_parcelamento_id,
    transacao_conta_id,
    transacao_categoria_id,
    transacao_subcategoria_id,
    transacao_classe_id,
    transacao_subclasse_id,
    transacao_data_lancamento
  }) {
    const query = `
      INSERT INTO transacoes 
        (transacao_descricao, transacao_valor, transacao_remetente_id, transacao_metodo_pagamento_id, 
        transacao_forma_parcelamento_id, transacao_conta_id, transacao_categoria_id, transacao_subcategoria_id, 
        transacao_classe_id, transacao_subclasse_id, transacao_data_lancamento)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`;
    
    const values = [
      transacao_descricao,
      transacao_valor,
      transacao_remetente_id,
      transacao_metodo_pagamento_id,
      transacao_forma_parcelamento_id,
      transacao_conta_id,
      transacao_categoria_id,
      transacao_subcategoria_id,
      transacao_classe_id,
      transacao_subclasse_id,
      transacao_data_lancamento
    ];
    
    const result = await db.query(query, values);
    return result.rows[0]; // ✅
  },

  // Obter todas as transações
  async getAll() {
    // const query = `SELECT * FROM transacoes`; // Selecionar tudo
    const query = `
    SELECT
      transacao_id,
      transacao_descricao,
      transacao_valor,
      r.remetente_nome AS transacao_remetente_nome,
      mp.metodo_pagamento_descricao AS transacao_metodo_pagamento_descricao,
      p.forma_parcelamento_numero_parcelas AS transacao_parcelas,
      co.conta_nome AS transacao_conta_nome,
        c.categoria_id AS transacao_categoria_id, 
      c.categoria_nome AS transacao_categoria_nome,
      sc.subcategoria_nome AS transacao_subcategoria_nome,
      cl.classe_nome AS transacao_classe_nome,
      scl.subclasse_nome AS transacao_subclasse_nome,
      transacao_data_lancamento
    FROM 
      transacoes t
    JOIN remetentes r 
      ON t.transacao_remetente_id = r.remetente_id
    JOIN metodos_pagamento mp 
      ON t.transacao_metodo_pagamento_id = mp.metodo_pagamento_id
    JOIN formas_parcelamento p 
      ON t.transacao_forma_parcelamento_id = p.forma_parcelamento_id
    JOIN contas co 
      ON t.transacao_conta_id = co.conta_id
    JOIN categorias c 
      ON t.transacao_categoria_id = c.categoria_id
    JOIN subcategorias sc 
      ON t.transacao_subcategoria_id = sc.subcategoria_id
    JOIN classes cl 
      ON t.transacao_classe_id = cl.classe_id
    JOIN subclasses scl 
      ON t.transacao_subclasse_id = scl.subclasse_id;
  `;
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
  async update(transacao_id, {
    transacao_descricao,
    transacao_valor,
    transacao_remetente_id,
    transacao_metodo_pagamento_id,
    transacao_forma_parcelamento_id,
    transacao_conta_id,
    transacao_categoria_id,
    transacao_subcategoria_id,
    transacao_classe_id,
    transacao_subclasse_id,
    transacao_data_lancamento
  }) {
    const query = `
      UPDATE transacoes 
      SET transacao_descricao = $1, 
          transacao_valor = $2,
          transacao_remetente_id = $3,
          transacao_metodo_pagamento_id = $4,
          transacao_forma_parcelamento_id = $5,
          transacao_conta_id = $6,
          transacao_categoria_id = $7,
          transacao_subcategoria_id = $8,
          transacao_classe_id = $9,
          transacao_subclasse_id = $10,
          transacao_data_lancamento = $11
      WHERE transacao_id = $12 
      RETURNING *`;

      const values = [
        transacao_descricao,
        transacao_valor,
        transacao_remetente_id,
        transacao_metodo_pagamento_id,
        transacao_forma_parcelamento_id,
        transacao_conta_id,
        transacao_categoria_id,
        transacao_subcategoria_id,
        transacao_classe_id,
        transacao_subclasse_id,
        transacao_data_lancamento
      ];
    
    const result = await db.query(query, [values, transacao_id]);
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
