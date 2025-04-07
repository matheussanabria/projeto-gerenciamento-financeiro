

-- 4️⃣ Parcelamentos (Agora Apenas para Cartões de Crédito)
CREATE TABLE metodos_parcelamento (
    metodo_parcelamento_id SERIAL PRIMARY KEY,
    metodo_pagamento_id INT REFERENCES metodos_pagamento(metodo_pagamento_id),-- f
    metodo_parcelamento_numero_parcelas INT NOT NULL CHECK (metodo_parcelamento_numero_parcelas BETWEEN 0 AND 12), -- Limite de 0 a 12 parcelas
    metodo_parcelamento_taxa_juros NUMERIC(5, 2) DEFAULT 0.00 CHECK (metodo_parcelamento_taxa_juros >= 0),-- juros
    metodo_parcelamento_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
-- Índice para otimizar buscas por método de pagamento
CREATE INDEX idx_metodo_parcelamento ON parcelamentos (metodo_pagamento_id);

-- Inserir parcelamentos com taxas
INSERT INTO parcelamentos (metodo_pagamento_id, numero_parcelas, taxa_juros)
VALUES
(1, 0, 1.75), -- Pagamento à vista (4.30% juros)
(1, 1, 4.30), -- Pagamento à vista (4.30% juros)
(1, 2, 6.79), -- 2x com 6.79% de juros por mês
(1, 3, 9.28), -- 3x com 9.28% de juros por mês
(1, 4, 11.77), -- 4x com 11.77% de juros por mês
(1, 5, 14.26); -- 5x com 14.26% de juros por mês

-- visualização personalizada 
SELECT 
    mp.id AS metodo_id,
    mp.nome AS metodo_nome,
    p.numero_parcelas,
    p.taxa_juros
FROM 
    metodos_pagamento mp
INNER JOIN 
    parcelamentos p ON mp.id = p.metodo_pagamento_id;

"forma_parcelamento_id"                   |	"integer"
"forma_parcelamento_metodo_pagamento_id"  |	"integer"
"forma_parcelamento_numero_parcelas"      |	"integer"
"forma_parcelamento_taxa_juros"           |	"numeric" 
"forma_parcelamento_created_at"	          | "timestamp without time zone"
"forma_parcelamento_descricao_parcelas"   |	"character varying"

--------------------------------------------------
-- Documentação CRUD para Entidade: Parcelamento
--------------------------------------------------

-- Create (com regra de negócio)
/*
INSERT INTO forma_parcelamento (
    forma_parcelamento_metodo_pagamento_id,
    forma_parcelamento_numero_parcelas,
    forma_parcelamento_taxa_juros,
    forma_parcelamento_descricao_parcelas
) VALUES (
    :metodo_id,
    :parcelas,
    :taxa,
    :descricao
); -- Verificar se método permite parcelamento */

-- Read com Paginação
/*
SELECT * FROM forma_parcelamento
WHERE forma_parcelamento_metodo_pagamento_id = :metodo_id
ORDER BY forma_parcelamento_numero_parcelas
LIMIT :limit OFFSET :offset; */

-- Update de Taxas
/*
UPDATE forma_parcelamento
SET forma_parcelamento_taxa_juros = :nova_taxa
WHERE forma_parcelamento_id = :id; */

-- Delete em Cascata
/*
DELETE FROM forma_parcelamento
WHERE forma_parcelamento_metodo_pagamento_id = :metodo_id; -- Ao desativar parcelamento no método */


-- Visão de parcelamentos com métodos ativos
CREATE OR REPLACE VIEW vw_parcelamentos_ativos AS
SELECT 
    fp.*,
    mp.metodo_pagamento_descricao
FROM forma_parcelamento fp
INNER JOIN metodo_pagamento mp 
    ON fp.forma_parcelamento_metodo_pagamento_id = mp.metodo_pagamento_id
    AND mp.metodo_pagamento_ativo = true;

COMMENT ON VIEW vw_parcelamentos_ativos IS 'Usar no checkout para mostrar opções de parcelamento';


/* Exemplo: Listagem para datagrid */
-- GET /parcelamentos?metodo_id=5
SELECT 
    forma_parcelamento_id AS id,
    forma_parcelamento_numero_parcelas AS parcelas,
    forma_parcelamento_taxa_juros AS juros,
    forma_parcelamento_descricao_parcelas AS descricao
FROM forma_parcelamento
WHERE forma_parcelamento_metodo_pagamento_id = 5
ORDER BY forma_parcelamento_numero_parcelas;

