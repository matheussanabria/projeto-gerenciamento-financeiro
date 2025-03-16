
-- Passo 3: Criar tabela transacoes (receberá as estrangeiras)

-- PgAdmin
DROP TABLE IF EXISTS transacoes CASCADE; -- Excluir tabela se existir nome_tabela CASCADE (mesmo que existam dependencias externas)

-- CRIAR TABELA TRANSACOES
    CREATE TABLE transacoes (
        transacao_id SERIAL PRIMARY KEY,
        transacao_descricao TEXT NOT NULL,
        transacao_valor NUMERIC(10, 2) NOT NULL CHECK (valor >= 0), -- Evita valores negativos
        transacao_remetente_id INT, 
        transacao_metodo_pagamento_id INT,
        transacao_forma_parcelamento_id INT,
        transacao_conta_id INT,
        transacao_categoria_id INT,
        transacao_subcategoria_id INT,
        transacao_classe_id INT,
        transacao_subclasse_id INT,
        transacao_data_lancamento DATE NOT NULL DEFAULT CURRENT_DATE,
        
        -- Definição de Chaves Estrangeiras com regras de exclusão
        FOREIGN KEY (transacao_remetente_id) REFERENCES remetentes(remetente_id) ON DELETE SET NULL,
        FOREIGN KEY (transacao_metodo_pagamento_id) REFERENCES metodos_pagamento(metodo_pagamento_id) ON DELETE SET NULL,
        FOREIGN KEY (transacao_forma_parcelamento_id) REFERENCES formas_parcelamento(forma_parcelamento_id) ON DELETE SET NULL,
        FOREIGN KEY (transacao_conta_id) REFERENCES contas(conta_id) ON DELETE CASCADE, -- Caso a conta seja removida, remove as transações
        FOREIGN KEY (transacao_categoria_id) REFERENCES categorias(categoria_id) ON DELETE SET NULL,
        FOREIGN KEY (transacao_subcategoria_id) REFERENCES subcategorias(subcategoria_id) ON DELETE SET NULL,
        FOREIGN KEY (transacao_classe_id) REFERENCES classes(classe_id) ON DELETE SET NULL,
        FOREIGN KEY (transacao_subclasse_id) REFERENCES subclasses(subclasse_id) ON DELETE SET NULL
    );

    -- Índices para otimização de buscas frequentes
    CREATE INDEX idx_transacoes_data_lancamento ON transacoes (transacao_data_lancamento);
    CREATE INDEX idx_transacoes_categoria ON transacoes (transacao_categoria_id);
    CREATE INDEX idx_transacoes_conta ON transacoes (transacao_conta_id);



-- inserir em transacoes
-- Exemplo 1: Receita com pagamento via crédito
INSERT INTO transacoes (
    descricao,
    valor, 
    data, 
    categoria_id, 
    subcategoria_id, 
    classe_id, 
    subclasse_id, 
    metodo_pagamento_id, 
    conta_id
) VALUES (
    'Coloração', 
    100.00, 
    '2025-01-14', 
    1, 
    5, 
    5, 
    5,
    22, 
    5
);

INSERT INTO transacoes (
    descricao, 
    valor, 
    remetente_id, 
    metodo_pagamento_id, 
    conta_id, 
    categoria_id, 
    subcategoria_id, 
    classe_id, 
    subclasse_id, 
    data
) VALUES (
    'Aluguel 09/24', 
    800.00, 
    1, 
    '2024-09-15', 
    2, 
    1, 
    1, 
    1, 
    2
),(
    'Salário 09/24', 
    1000.00, 
    1, 
    '2024-09-20', 
    1, 
    3, 
    3, 
    4, 
    2
), (
    'Conta de Luz 09/24', 
    150.00, 
    2, 
    '2024-09-20', 
    2, 
    1, 
    1, 
    2, 
    2
);


INSERT INTO transacoes (
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
    transacao_data_lancamento
) VALUES (
        'Compra supermercado', 
        150.75, 
        1, 
        3, 
        NULL, 
        1, 
        2, 
        4, 
        7, 
        13, 
        '2025-02-01'
);
	
-- Verificando as inserções
SELECT * FROM transacoes;

-- view personalizada da tabela transacoes 
SELECT
    transacao_id
    transacao_descricao,
    transacao_valor,
	r.remetente_nome AS remetente_nome,
    mp.metodo_pagamento_nome AS metodo_pagamento_nome,
    p.numero_parcelas AS numero_parcelas,
    co.conta_nome AS conta_nome,
    c.categoria_nome AS categoria_nome,
    sc.subcategoria_nome AS subcategoria_nome,
    cl.classe_nome AS classe_nome,
    scl.subclasse_nome AS subclasse_nome,
    transacao_data_lancamento,
FROM 
    transacoes t
JOIN remetentes r ON t.remetente_id = r.remetente_id
JOIN metodos_pagamento mp ON t.metodo_pagamento_id = mp.metodo_pagamento_id
JOIN formas_parcelamento p ON t.forma_parcelamento_id = p.forma_parcelamento_id
JOIN contas co ON t.conta_id = co.conta_id
JOIN categorias c ON t.categoria_id = c.categoria_id
JOIN subcategorias sc ON t.subcategoria_id = sc.subcategoria_id
JOIN classes cl ON t.classe_id = cl.classe_id
JOIN subclasses scl ON t.subclasse_id = scl.subclasse_id;


-- inicio script para realizar uma transação e atualzar saldo da conta
DO $$ 
DECLARE 
    transacao_id INT;
    transacao_valor NUMERIC;
    v_conta_id INT;  -- Variável para armazenar o ID da conta
    v_numero_parcelas TEXT;  -- Variável para armazenar o número de parcelas
BEGIN
    -- 1. Inserir a transação na tabela transacoes e capturar os valores necessários
    INSERT INTO transacoes (
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
        transacao_data_lancamento
    ) 
    VALUES (
        'Hidratação',               -- Descrição
        100.00,                     -- Valor
        (SELECT remetente_id FROM remetentes WHERE remetente_nome = 'Fernanda' LIMIT 1), -- Remetente
        (SELECT metodo_pagamento_id FROM metodos_pagamento WHERE metodo_pagamento_nome = 'Débito' LIMIT 1), -- Método de pagamento
        (SELECT metodo_parcelamento_id FROM formas_parcelamento WHERE forma_parcelamento_numero_parcelas = 'À vista' LIMIT 1),-- Parcelamento
        (SELECT conta_id FROM contas WHERE conta_nome = 'Salão' LIMIT 1), -- Conta
        (SELECT categoria_id FROM categorias WHERE categoria_nome = 'Receitas' LIMIT 1), -- Categoria
        (SELECT subcategoria_id FROM subcategorias WHERE subcategoria_nome = 'Serviços Prestados' LIMIT 1), -- Subcategoria
        (SELECT classe_id FROM classes WHERE classe_nome = 'Cabeleireiro' LIMIT 1), -- Classe
        (SELECT subclasse_id FROM subclasses WHERE subclasse_nome = 'Coloração' LIMIT 1), -- Subclasse
        '2025-01-14'               -- Data
    )
    RETURNING transacao_id, transacao_valor, transacao_conta_id, 
              (
                SELECT forma_parcelamento_numero_parcelas FROM formas_parcelamento WHERE forma_parcelamento_id = forma_parcelamento_id) 
              INTO transacao_id, transacao_valor, v_conta_id, v_numero_parcelas;

    -- 2. Atualizar o saldo da conta com o valor da transação inserida
    UPDATE contas
    SET conta_saldo = conta_saldo + transacao_valor
    WHERE conta_id = v_conta_id;

    -- 3. Retornar os resultados
    RAISE NOTICE 'Transação inserida com ID: %, Valor: %. Conta ID: %, Número de Parcelas: %', 
                 transacao_id, transacao_valor, v_conta_id, v_numero_parcelas;
    RAISE NOTICE 'Saldo atualizado da conta: %', 
                 (SELECT conta_saldo FROM contas WHERE conta_id = v_conta_id);
END $$;
