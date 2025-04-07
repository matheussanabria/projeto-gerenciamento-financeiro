
-- 2️⃣ Bandeiras de Cartão (Para Métodos de Pagamento do Tipo "Cartão")
CREATE TABLE bandeiras_cartao (
    bandeira_cartao_id SERIAL PRIMARY KEY,
    bandeira_cartao_nome TEXT NOT NULL UNIQUE CHECK (nome IN ('VISA', 'Mastercard', 'Elo', 'American Express', 'Hipercard', 'Diners', 'Outros'))
);


"bandeira_id"	"integer"
"bandeira_nome"	"character varying"

-------------------------------------------
-- Documentação CRUD para Entidade: Bandeira
-------------------------------------------

-- Create (Criação)
/* 
INSERT INTO bandeira (bandeira_nome)
VALUES (:nome);
Exemplo frontend: { "nome": "Visa" } */
COMMENT ON TABLE bandeira IS 'Entidade para armazenar bandeiras de cartões (CRUD: create/read/update/delete)';

-- Read (Leitura)
/* 
SELECT * FROM bandeira; -- Lista todas
SELECT * FROM bandeira WHERE bandeira_id = :id; -- Busca por ID
SELECT * FROM bandeira WHERE bandeira_nome LIKE :filtro; -- Filtro por nome */
COMMENT ON COLUMN bandeira.bandeira_id IS 'Identificador único (usar em operações GET/PUT/DELETE)';

-- Update (Atualização)
/*
UPDATE bandeira 
SET bandeira_nome = :novo_nome
WHERE bandeira_id = :id; */
COMMENT ON COLUMN bandeira.bandeira_nome IS 'Nome editável da bandeira (atualizar via PUT)';

-- Delete (Exclusão)
/*
DELETE FROM bandeira
WHERE bandeira_id = :id
AND NOT EXISTS (
    SELECT 1 FROM metodo_pagamento
    WHERE bandeira_id = :id
); -- Só exclui se não estiver em uso */
COMMENT ON TABLE bandeira IS '@Operations: GET /bandeiras, POST /bandeiras, PUT /bandeiras/:id, DELETE /bandeiras/:id';

/* Exemplo: Atualização parcial */
-- PATCH /bandeiras/2
UPDATE bandeira
SET bandeira_nome = 'Elo'
WHERE bandeira_id = 2
RETURNING *;    