-- 1️⃣ Formas de Pagamento (Definição Geral)
CREATE TABLE formas_pagamento (
    forma_pagamento_id SERIAL PRIMARY KEY,
    forma_pagamento_nome TEXT NOT NULL UNIQUE CHECK (nome IN ('Dinheiro', 'Pix', 'Débito', 'Crédito', 'Fiado', 'Saldo'))
);


"forma_pagamento_id"   | "integer"
"forma_pagamento_nome" | "text"

----------------------------------------------
-- Documentação CRUD para Entidade: Forma Pagamento
----------------------------------------------

-- Create
/*
INSERT INTO forma_pagamento (forma_pagamento_nome)
VALUES (:nome); -- Ex: 'Pix', 'Cartão de Crédito' */

-- Read
/*
SELECT * FROM forma_pagamento ORDER BY forma_pagamento_nome; -- Lista ordenada
SELECT forma_pagamento_id AS id, forma_pagamento_nome AS nome FROM forma_pagamento; -- Projeção para selects */

-- Update
/*
UPDATE forma_pagamento
SET forma_pagamento_nome = :novo_nome
WHERE forma_pagamento_id = :id; */

-- Delete
/*
DELETE FROM forma_pagamento
WHERE forma_pagamento_id = :id
AND NOT EXISTS (
    SELECT 1 FROM metodo_pagamento
    WHERE forma_pagamento_id = :id
); -- Valida relacionamentos */