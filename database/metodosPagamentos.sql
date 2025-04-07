
-- CRIAR TABELA METODOS_PAGAMENTO
DROP IF EXISTS metodos_pagamento CASCADE;-- Excluir tabela se existir nome_tabela CASCADE (mesmo que existam dependencias externas)

-- 3️⃣ Métodos de Pagamento (Relacionando Formas e Bandeiras)
CREATE TABLE metodos_pagamento (
    metodo_pagamento_id SERIAL PRIMARY KEY,
    forma_pagamento_id INT REFERENCES formas_pagamento(id), -- Define se é Pix, Crédito, Débito, etc.
    bandeira_id INT REFERENCES bandeiras_cartao(id), -- Somente para cartões de crédito/débito
    metodo_pagamento_descricao TEXT,
    metodo_pagamento_ativo BOOLEAN DEFAULT TRUE,
    metodo_pagamento_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para otimizar buscas por forma de pagamento
CREATE INDEX idx_forma_pagamento ON metodos_pagamento (forma_pagamento_id);

-- Inserindo métodos de pagamento na tabela
INSERT INTO metodos_pagamento (tipo_pagamento, bandeira, descricao, ativo) VALUES 
('Crédito', 'VISA', 'Cartão de crédito VISA para compras parceladas', TRUE),
('Pix', NULL, 'Pagamento instantâneo via Pix', TRUE),
('Fiado', NULL, 'Compra a prazo com pagamento posterior', FALSE);


"metodo_pagamento_id"         |	"integer"
"forma_pagamento_id"          |	"integer"
"bandeira_id"                 |	"integer"
"metodo_pagamento_descricao"  |	"text"
"metodo_pagamento_ativo"      |	"boolean"
"metodo_pagamento_created_at" |	"timestamp without time zone"
"permite_parcelamento"        |	"boolean"

-----------------------------------------------
-- Documentação CRUD para Entidade: Método Pagamento
-----------------------------------------------

-- Create (com validação de FK)
/*
INSERT INTO metodo_pagamento (
    forma_pagamento_id,
    bandeira_id,
    metodo_pagamento_descricao,
    metodo_pagamento_ativo,
    permite_parcelamento
) VALUES (
    :forma_id,
    :bandeira_id, -- Opcional
    :descricao,
    :ativo,
    :permite_parcelamento
); */

-- Read (com joins)
/*
SELECT 
    mp.*,
    fp.forma_pagamento_nome,
    b.bandeira_nome
FROM metodo_pagamento mp
LEFT JOIN forma_pagamento fp ON mp.forma_pagamento_id = fp.forma_pagamento_id
LEFT JOIN bandeira b ON mp.bandeira_id = b.bandeira_id; */

-- Update Parcial (Patch)
/*
UPDATE metodo_pagamento
SET metodo_pagamento_ativo = :novo_status
WHERE metodo_pagamento_id = :id; */

-- Delete Condicional
/*
DELETE FROM metodo_pagamento
WHERE metodo_pagamento_id = :id
AND metodo_pagamento_ativo = false; -- Só exclui métodos inativos */


-- Visão completa métodos de pagamento
CREATE OR REPLACE VIEW vw_metodos_pagamento AS
SELECT 
    mp.metodo_pagamento_id AS id,
    fp.forma_pagamento_nome AS forma,
    b.bandeira_nome AS bandeira,
    mp.metodo_pagamento_descricao AS descricao,
    mp.metodo_pagamento_ativo AS ativo,
    mp.permite_parcelamento AS parcelamento
FROM metodo_pagamento mp
LEFT JOIN forma_pagamento fp USING (forma_pagamento_id)
LEFT JOIN bandeira b USING (bandeira_id);

COMMENT ON VIEW vw_metodos_pagamento IS 'Listagem simplificada para selects no frontend';


/* Exemplo: Criar novo método de pagamento */
-- POST /metodos-pagamento
INSERT INTO metodo_pagamento (
    forma_pagamento_id,
    bandeira_id,
    metodo_pagamento_descricao,
    metodo_pagamento_ativo,
    permite_parcelamento
) VALUES (
    1,          -- ID forma pagamento (Cartão)
    3,          -- ID bandeira (Mastercard)
    'Crédito até 12x',
    true,
    true
);

-- Obter ID inserido
SELECT currval('metodo_pagamento_metodo_pagamento_id_seq');


-- Atualizar mesma coluna de multiplos identificadores
UPDATE metodos_pagamento
SET metodo_pagamento_descricao = CASE
    WHEN metodo_pagamento_id = 1 THEN 'Dinheiro'
    WHEN metodo_pagamento_id = 2 THEN 'Pix'
    WHEN metodo_pagamento_id = 5 THEN 'Fiado'
    WHEN metodo_pagamento_id = 7 THEN 'Cartão de Crédito Visa'
    WHEN metodo_pagamento_id = 8 THEN 'Cartão de Crédito Mastercard'
    WHEN metodo_pagamento_id = 9 THEN 'Cartão de Débito Visa'
    WHEN metodo_pagamento_id = 10 THEN 'Cartão de Débito Mastercard'
END
WHERE metodo_pagamento_id IN (1, 2, 5, 7, 8, 9, 10);


    -- Criar ou substituir view 
    CREATE OR REPLACE VIEW view_metodos_pagamento AS
    SELECT
        mp.metodo_pagamento_id,
        mp.metodo_pagamento_descricao,
        mp.metodo_pagamento_ativo,
        mp.metodo_pagamento_created_at,
        mp.permite_parcelamento,
        fp.forma_pagamento_nome, -- Nome da forma de pagamento
        b.bandeira_nome -- Nome da bandeira (pode ser NULL)
    FROM
        metodos_pagamento mp
    INNER JOIN formas_pagamento fp 
        ON mp.forma_pagamento_id = fp.forma_pagamento_id
    LEFT JOIN bandeiras b 
        ON mp.bandeira_id = b.bandeira_id;

SELECT * FROM view_metodos_pagamento;