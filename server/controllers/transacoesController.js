// controllers/transacoesController.js
const db = require('../utils/db');

// exports.createTransacao = async (req, res) => {
//     const {
//         descricao,
//         valor,
//         remetente_nome,
//         metodo_pagamento_nome,
//         numero_parcelas,
//         conta_nome,
//         categoria_nome,
//         subcategoria_nome,
//         classe_nome,
//         subclasse_nome,
//         data
//     } = req.body;

//     try {
//         // Iniciar uma transação no banco de dados
//         await db.query('BEGIN');

//         // Função auxiliar para buscar ID de tabelas relacionadas
//         const getId = async (tableName, columnName, value) => {
//             const result = await db.query(
//                 `SELECT id FROM ${tableName} WHERE ${columnName} = $1 LIMIT 1`,
//                 [value]
//             );
//             return result.rows[0]?.id;
//         };

//         // Obter IDs das tabelas relacionadas
//         const remetenteId = await getId('remetentes', 'remetente_nome', remetente_nome);
//         const metodoId = await getId('metodos_pagamento', 'nome', metodo_pagamento_nome);
//         const parcelamentoId = await getId('parcelamentos', 'numero_parcelas', numero_parcelas);
//         const contaId = await getId('contas', 'nome', conta_nome);
//         const categoriaId = await getId('categorias', 'categoria_nome', categoria_nome);
//         const subcategoriaId = await getId('subcategorias', 'subcategoria_nome', subcategoria_nome);
//         const classeId = await getId('classes', 'classe_nome', classe_nome);
//         const subclasseId = await getId('subclasses', 'subclasse_nome', subclasse_nome);

//         // Verificar se todos os IDs foram encontrados
//         if (!remetenteId || !metodoId || !parcelamentoId || !contaId || !categoriaId || !subcategoriaId || !classeId || !subclasseId) {
//             throw new Error('Algum dos IDs relacionados não foi encontrado. Verifique os dados fornecidos.');
//         }

//         // Inserir a transação na tabela 'transacoes' e capturar os valores necessários
//         const transacaoResult = await db.query(
//             `INSERT INTO transacoes (
//                 descricao, valor, remetente_id, metodo_pagamento_id,
//                 parcelamento_id, conta_id, categoria_id,
//                 subcategoria_id, classe_id, subclasse_id, data
//             ) 
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//             RETURNING id, valor, conta_id`,
//             [
//                 descricao, valor, remetenteId, metodoId,
//                 parcelamentoId, contaId, categoriaId,
//                 subcategoriaId, classeId, subclasseId, data
//             ]
//         );

//         // Extrair informações da transação criada
//         const { id: transacaoId, valor: transacaoValor, conta_id: transacaoContaId } = transacaoResult.rows[0];

//         // Atualizar o saldo da conta com o valor da transação
//         await db.query(
//             'UPDATE contas SET saldo = saldo + $1 WHERE id = $2',
//             [transacaoValor, transacaoContaId]
//         );

//         // Confirmar a transação no banco de dados
//         await db.query('COMMIT');

//         // Retornar sucesso
//         res.status(201).json({
//             message: 'Transação inserida e saldo atualizado com sucesso!',
//             transacaoId
//         });

//     } catch (error) {
//         // Reverter a transação em caso de erro
//         await db.query('ROLLBACK');

//         // Enviar mensagem de erro para o cliente
//         res.status(400).json({ error: error.message });
//     }
// };


// exports.createTransacao = async (req, res) => {
//     const {
//         descricao,
//         valor,
//         remetente_nome,
//         metodo_pagamento_nome,
//         numero_parcelas,
//         conta_nome,
//         categoria_nome,
//         subcategoria_nome,
//         classe_nome,
//         subclasse_nome,
//         data
//     } = req.body;

//     try {
//         // Iniciar uma transação
//         await db.query('BEGIN');

//         // Obter IDs das tabelas relacionadas
//         const remetenteId = (await db.query(
//             'SELECT id FROM remetentes WHERE remetente_nome = $1 LIMIT 1',
//             [remetente_nome]
//         )).rows[0]?.id;

//         const metodoId = (await db.query(
//             'SELECT id FROM metodos_pagamento WHERE nome = $1 LIMIT 1',
//             [metodo_pagamento_nome]
//         )).rows[0]?.id;

//         const parcelamentoId = (await db.query(
//             'SELECT id FROM parcelamentos WHERE numero_parcelas = $1 LIMIT 1',
//             [numero_parcelas]
//         )).rows[0]?.id;

//         const contaId = (await db.query(
//             'SELECT id FROM contas WHERE nome = $1 LIMIT 1',
//             [conta_nome]
//         )).rows[0]?.id;

//         const categoriaId = (await db.query(
//             'SELECT id FROM categorias WHERE categoria_nome = $1 LIMIT 1',
//             [categoria_nome]
//         )).rows[0]?.id;

//         const subcategoriaId = (await db.query(
//             'SELECT subcategoria_id FROM subcategorias WHERE subcategoria_nome = $1 LIMIT 1',
//             [subcategoria_nome]
//         )).rows[0]?.id;
        

//         const classeId = (await db.query(
//             'SELECT id FROM classes WHERE classe_nome = $1 LIMIT 1',
//             [classe_nome]
//         )).rows[0]?.id;

//         const subclasseId = (await db.query(
//             'SELECT id FROM subclasses WHERE subclasse_nome = $1 LIMIT 1',
//             [subclasse_nome]
//         )).rows[0]?.id;

//         if (!remetenteId || !metodoId || !parcelamentoId || !contaId || !categoriaId || !subcategoriaId || !classeId || !subclasseId) {
//             throw new Error('IDs relacionados não encontrados. Verifique os dados fornecidos.');
//         }

//         // Inserir a transação
//         const transacao = await db.query(
//             `INSERT INTO transacoes (
//                 descricao, valor, remetente_id, metodo_pagamento_id,
//                 parcelamento_id, conta_id, categoria_id,
//                 subcategoria_id, classe_id, subclasse_id, data
//             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//             RETURNING id, valor, conta_id`,
//             [
//                 descricao, valor, remetenteId, metodoId,
//                 parcelamentoId, contaId, categoriaId,
//                 subcategoriaId, classeId, subclasseId, data
//             ]
//         );

//         const { id: transacaoId, valor: transacaoValor, conta_id: transacaoContaId } = transacao.rows[0];

//         // Atualizar o saldo da conta
//         await db.query(
//             'UPDATE contas SET saldo = saldo + $1 WHERE id = $2',
//             [transacaoValor, transacaoContaId]
//         );

//         // Confirmar a transação
//         await db.query('COMMIT');

//         res.status(201).json({
//             message: 'Transação inserida e saldo atualizado com sucesso!',
//             transacaoId
//         });
//     } catch (error) {
//         // Reverter a transação em caso de erro
//         await db.query('ROLLBACK');
//         res.status(400).json({ error: error.message });
//     }
// };
exports.createTransacao = async (req, res) => {
    const {
      descricao,
      valor,
      remetente_id,
      metodo_pagamento_id,
      parcelamento_id,
      conta_id,
      categoria_id,
      subcategoria_id,
      classe_id,
      subclasse_id,
      data,
      forma_pagamento_id
    } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO transacoes 
          (descricao, valor, remetente_id, metodo_pagamento_id, parcelamento_id, conta_id, 
           categoria_id, subcategoria_id, classe_id, subclasse_id, data, forma_pagamento_id)
         VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
         RETURNING *`,
        [
          descricao,
          valor,
          remetente_id,
          metodo_pagamento_id,
          parcelamento_id,
          conta_id,
          categoria_id,
          subcategoria_id,
          classe_id,
          subclasse_id,
          data,
          forma_pagamento_id
        ]
      );
  
      res.status(201).json({
        message: 'Transação criada com sucesso!',
        transaction: result.rows[0],  // Retorna os dados da transação inserida
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Erro ao criar transação',
        error: err.message,
      });
    }
  };

// Obter todas as transações com dados relacionados (JOIN)
exports.getTransacoes = async (req, res) => {
    try {
        // const query = `SELECT * from transacoes`;

        const query = `
            
      select * from view_transacoes;


            `;
        const result = await db.query(query);

        

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter uma transação pelo ID
exports.getTransacaoById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM transacoes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar uma transação
exports.updateTransacao = async (req, res) => {
    const { id } = req.params;
    const { transacao_descricao, transacao_valor, transacao_data } = req.body;

    try {
        const result = await db.query(
            'UPDATE transacoes SET transacao_descricao = $1, transacao_valor = $2, transacao_data = $3 WHERE id = $4 RETURNING *',
            [transacao_descricao, transacao_valor, transacao_data, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }

        res.status(200).json({ message: 'Transação atualizada com sucesso!', transacao: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Excluir uma transação
exports.deleteTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM transacoes WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }

        res.status(200).json({ message: 'Transação excluída com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
