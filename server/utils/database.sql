CREATE DATABASE gerenciamentoFinanceiro;

CREATE TABLE receitabruta(
	id SERIAL,
	descricao VARCHAR(255),
	valor NUMERIC,
	metodo VARCHAR(255),
	remetente VARCHAR(255),
	categoria VARCHAR(255),
	subcategoria VARCHAR(255),
	classe VARCHAR(255),
	subclasse VARCHAR(255),
	data_gregoriana DATE,
	sincronario VARCHAR(255),
	plasma VARCHAR(255),
	heptal VARCHAR(255),
	lua VARCHAR(255)
);

INSERT INTO receitabruta (
	descricao,
	valor,
	metodo,
	remetente,
	categoria,
	subcategoria,
	classe,
	subclasse,
	data_gregoriana,
	sincronario,
	plasma,
	heptal,
	lua
) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *;

UPDATE receitabruta SET (
	descricao,
	valor,
	metodo,
	remetente,
	categoria,
	subcategoria,
	classe,
	subclasse,
	data_gregoriana,
	sincronario,
	plasma,
	heptal,
	lua
) = ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) WHERE id = $14 ;
-- ATUALIZE nome_tabela DEFINA (nome_colunas) = (valor_colunas) QUANDO coluna_id = valor_id;

DELETE FROM receitabruta WHERE id = $1;

-- PgAdmin
DROP TABLE IF EXISTS transacoes CASCADE;

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    metodo_pagamento_id INTEGER REFERENCES metodos_pagamento(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
    subcategoria_id INTEGER REFERENCES subcategorias(id) ON DELETE CASCADE,
    classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    subclasse_id INTEGER REFERENCES subclasses(id) ON DELETE CASCADE,
    remetente_id INTEGER REFERENCES remetentes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transacoes (descricao, valor, metodo_pagamento_id, data, categoria_id, subcategoria_id, classe_id, subclasse_id, remetente_id) VALUES 
('Aluguel 09/24', 800.00, 1, '2024-09-15', 2, 1, 1, 1, 2),
('Salário 09/24', 1000.00, 1, '2024-09-20', 1, 3, 3, 4, 2),
('Conta de Luz 09/24', 150.00, 2, '2024-09-20', 2, 1, 1, 2, 2);


-- criar tabela 
CREATE TABLE remetentes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) NOT NULL UNIQUE,
    endereco TEXT,
    telefone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- inserir na tabela
INSERT INTO remetentes (nome, cpf_cnpj, endereco, telefone)
VALUES
    ('João da Silva', '123.456.789-09', 'Rua A, 123, Centro', '(11) 91234-5678'),
    ('Maria Oliveira', '12.345.678/0001-95', 'Avenida B, 456, Jardim', '(11) 98765-4321'),
    ('Carlos Pereira', '987.654.321-00', 'Rua C, 789, Bairro', '(11) 99876-5432');

-- atualizar na tabela
UPDATE remetentes
SET 
    nome = 'Ana Costa',
    cpf_cnpj = '321.654.987-11',
    endereco = 'Travessa D, 321, Vila Nova',
    telefone = '(11) 92345-6789'
WHERE
    nome = 'João da Silva' AND cpf_cnpj = '123.456.789-09';

CREATE TABLE metodos_pagamento (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
);

INSERT INTO metodos_pagamento (nome) VALUES 
('Pix'), 
('Transferência'), 
('Cartão de Crédito'), 
('Dinheiro');



DROP TABLE IF EXISTS subclasses CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS subcategorias CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE
);

INSERT INTO categorias (nome) VALUES ('Ganhos'), ('Gastos');


CREATE TABLE subcategorias (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE
);

INSERT INTO subcategorias (nome, categoria_id) VALUES 
('Gastos Essenciais', 2), 
('Gastos Não Essenciais', 2),
('Salário', 1);



CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    subcategoria_id INTEGER REFERENCES subcategorias(id) ON DELETE CASCADE
);

INSERT INTO classes (nome, subcategoria_id) VALUES 
('Moradia', 1), 
('Lazer', 2), 
('Renda Fixa', 3);


CREATE TABLE subclasses (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE
);

INSERT INTO subclasses (nome, classe_id) VALUES 
('Aluguel', 1), 
('Conta de Luz', 1),
('Viagens', 2),
('Ações', 3);

