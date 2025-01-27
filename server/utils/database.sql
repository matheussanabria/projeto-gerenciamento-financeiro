-- Scripts para criação e manutenção do banco de dados
CREATE DATABASE gerenciamentoFinanceiro; -- Criar banco de dados nome_banco_de_dados

CREATE TABLE receitabruta( -- Criar tabela nome_tabela
	id SERIAL, -- nome_coluna tipo_de_dado
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

INSERT INTO receitabruta ( -- Inserir na nome_tabela
	descricao,	-- nome_coluna
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
) VALUES(
	$1, -- retorna 1_valor solicitado
	$2,
	$3,
	$4,
	$5,
	$6,
	$7,
	$8,
	$9,
	$10,
	$11,
	$12,
	$13
	) RETURNING *; -- retorna todos_valores

UPDATE receitabruta SET ( -- Atualizar nome_tabela
	descricao, -- nome_coluna
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
) = ($1, -- retorna valor_1_coluna solicitada
	$2,
	$3,
	$4,
	$5,
	$6,
	$7,
	$8,
	$9,
	$10,
	$11,
	$12,
	$13
	) WHERE id = $14 ; -- retorna QUANDO nome_coluna for igual ao 14_valor solicitado
-- ATUALIZE nome_tabela DEFINA (nome_colunas) = (valor_colunas) QUANDO coluna_id = valor_id;

DELETE FROM receitabruta WHERE id = $1; -- deletar de nome_tabela QUANDO nome_coluna for igual ao 1_valor solicitado

-- PgAdmin
DROP TABLE IF EXISTS transacoes CASCADE; -- Excluir tabela se existir nome_tabela CASCADE (mesmo que existam dependencias externas)

-- TRANSACOES
-- Criar tabela transacoes
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

-- transacoes atualizada
CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    remetente_id INT, -- Relacionando com a tabela de remetentes
    metodo_pagamento_id INT,
	parcelamento_id INT, -- Relaciona com o parcelamento escolhido
	conta_id INT,
    categoria_id INT,
    subcategoria_id INT,
    classe_id INT,
    subclasse_id INT,
    data DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (remetente_id) REFERENCES remetentes(id),
    FOREIGN KEY (metodo_pagamento_id) REFERENCES metodos_pagamento(id),
	FOREIGN KEY (parcelamento_id) REFERENCES parcelamentos(id),
    FOREIGN KEY (conta_id) REFERENCES contas(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id),
    FOREIGN KEY (classe_id) REFERENCES classes(id),
    FOREIGN KEY (subclasse_id) REFERENCES subclasses(id)
);


-- inserir em transacoes
-- Exemplo 1: Receita com pagamento via crédito
INSERT INTO transacoes (descricao, valor, data, categoria_id, subcategoria_id, classe_id, subclasse_id, metodo_pagamento_id, conta_id)
VALUES ('Coloração', 100.00, '2025-01-14', 1, 5, 5, 5, 22, 5);

INSERT INTO transacoes (descricao, valor, remetente_id, metodo_pagamento_id, conta_id, categoria_id, subcategoria_id, classe_id, subclasse_id, data) VALUES 
('Aluguel 09/24', 800.00, 1, '2024-09-15', 2, 1, 1, 1, 2),
('Salário 09/24', 1000.00, 1, '2024-09-20', 1, 3, 3, 4, 2),
('Conta de Luz 09/24', 150.00, 2, '2024-09-20', 2, 1, 1, 2, 2);

SELECT 
    t.id AS transacao_id,
    t.descricao AS transacao_descricao,
    t.valor,
	r.remetente_nome AS remetente_nome,
    mp.nome AS metodo_pagamento_nome,
    p.numero_parcelas AS numero_parcelas,
    co.nome AS conta_nome,
    t.data,
    c.categoria_nome AS categoria_nome,
    sc.subcategoria_nome AS subcategoria_nome,
    cl.classe_nome AS classe_nome,
    scb.subclasse_nome AS subclasse_nome
FROM 
    transacoes t
JOIN remetentes r ON t.remetente_id = r.id
JOIN metodos_pagamento mp ON t.metodo_pagamento_id = mp.id
JOIN parcelamentos p ON t.parcelamento_id = p.id
JOIN contas co ON t.conta_id = co.id
JOIN categorias c ON t.categoria_id = c.id
JOIN subcategorias sc ON t.subcategoria_id = sc.id
JOIN classes cl ON t.classe_id = cl.id
JOIN subclasses scb ON t.subclasse_id = scb.id;


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
        data
    ) 
    VALUES (
        'Hidratação',               -- Descrição
        100.00,                     -- Valor
        (SELECT id FROM remetentes WHERE remetente_nome = 'Fernanda' LIMIT 1), -- Remetente
        (SELECT id FROM metodos_pagamento WHERE nome = 'Débito' LIMIT 1), -- Método de pagamento
        (SELECT id FROM parcelamentos WHERE numero_parcelas = 'À vista' LIMIT 1),-- Parcelamento
        (SELECT id FROM contas WHERE nome = 'Salão' LIMIT 1), -- Conta
        (SELECT id FROM categorias WHERE categoria_nome = 'Receitas' LIMIT 1), -- Categoria
        (SELECT id FROM subcategorias WHERE subcategoria_nome = 'Serviços Prestados' LIMIT 1), -- Subcategoria
        (SELECT id FROM classes WHERE classe_nome = 'Cabeleireiro' LIMIT 1), -- Classe
        (SELECT id FROM subclasses WHERE subclasse_nome = 'Coloração' LIMIT 1), -- Subclasse
        '2025-01-14'               -- Data
    )
    RETURNING id, valor, conta_id, 
              (SELECT numero_parcelas FROM parcelamentos WHERE id = parcelamento_id) 
              INTO transacao_id, transacao_valor, v_conta_id, v_numero_parcelas;

    -- 2. Atualizar o saldo da conta com o valor da transação inserida
    UPDATE contas
    SET saldo = saldo + transacao_valor
    WHERE id = v_conta_id;

    -- 3. Retornar os resultados
    RAISE NOTICE 'Transação inserida com ID: %, Valor: %. Conta ID: %, Número de Parcelas: %', 
                 transacao_id, transacao_valor, v_conta_id, v_numero_parcelas;
    RAISE NOTICE 'Saldo atualizado da conta: %', 
                 (SELECT saldo FROM contas WHERE id = v_conta_id);
END $$;

-- REMETENTES
-- criar tabela remetentes
CREATE TABLE remetentes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) NOT NULL UNIQUE,
    endereco TEXT,
    telefone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- inserir em remetentes
INSERT INTO remetentes (nome, cpf_cnpj, endereco, telefone)
VALUES
    ('João da Silva', '123.456.789-09', 'Rua A, 123, Centro', '(11) 91234-5678'),
    ('Maria Oliveira', '12.345.678/0001-95', 'Avenida B, 456, Jardim', '(11) 98765-4321'),
    ('Carlos Pereira', '987.654.321-00', 'Rua C, 789, Bairro', '(11) 99876-5432');

-- atualizar remetentes
UPDATE remetentes
SET -- definir
    nome = 'Ana Costa', -- nome_coluna = 'valor_coluna'
    cpf_cnpj = '321.654.987-11',
    endereco = 'Travessa D, 321, Vila Nova',
    telefone = '(11) 92345-6789'
WHERE
    nome = 'João da Silva' AND cpf_cnpj = '123.456.789-09';

-- METODOS_PAGAMENTO
CREATE TABLE metodos_pagamento (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
);

DROP IF EXISTS metodos_pagamento CASCADE;

CREATE TABLE metodos_pagamento (
    id SERIAL PRIMARY KEY,
    forma_pagamento_id INT, -- Relaciona com a forma de pagamento (Dinheiro, Cartão, etc.)
    tipo_pagamento TEXT NOT NULL, -- Tipo de pagamento: 'Crédito', 'Débito'
    bandeira TEXT, -- Para cartões, a bandeira (ex.: 'VISA', 'Mastercard')
    descricao TEXT, -- Descrição adicional, por exemplo, sobre limites ou condições
    ativo BOOLEAN DEFAULT TRUE, -- Se o método está ativo
    FOREIGN KEY (forma_pagamento_id) REFERENCES formas_pagamento(id) -- Relacionamento com a tabela de formas de pagamento
);
CREATE TABLE parcelamentos (
    id SERIAL PRIMARY KEY,
    metodo_pagamento_id INT, -- Relaciona com a tabela metodos_pagamento
    numero_parcelas INT, -- Quantidade de parcelas
    taxa_juros NUMERIC(5, 2), -- Taxa de juros por mês para o número de parcelas
    FOREIGN KEY (metodo_pagamento_id) REFERENCES metodos_pagamento(id)
);



INSERT INTO metodos_pagamento (nome) VALUES 
('Pix'), 
('Transferência'), 
('Cartão de Crédito'), 
('Dinheiro');

-- Inserindo métodos de pagamento na tabela
INSERT INTO metodos_pagamento (nome, bandeira)
VALUES 
('Pix', 'Pix'),              -- Método Pix (sem juros)
('Dinheiro', 'Dinheiro'),         -- Método Dinheiro (sem juros)
('Débito', 'Master'),           -- Método Débito (juros de 1.75%)
('Crédito', 'Master'),     -- Crédito À vista (juros de 4.30%)
('Débito', 'Visa'),
('Crédito', 'Visa'),

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

CREATE TABLE contas (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE, -- Nome da conta (ex.: "Conta Corrente", "Poupança")
    saldo NUMERIC(10, 2) NOT NULL DEFAULT 0.00 -- Saldo inicial da conta
);

-- Exemplo 1: Matheus
INSERT INTO contas (nome, saldo)
VALUES ('Matheus', 0);

-- Exemplo 2: Poupança
INSERT INTO contas (nome, saldo)
VALUES ('Almir', 0);

-- Exemplo 3: Conta Salário
INSERT INTO contas (nome, saldo)
VALUES ('Ana', 0);

-- Exemplo 4: Conta de Investimentos
INSERT INTO contas (nome, saldo)
VALUES ('Pamela', 0);

-- Excluir tabela mesmo se existir dependencias externas
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS subcategorias CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS subclasses CASCADE;

-- CLASSES
-- Criar tabela categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE
);

-- inserir em categorias
INSERT INTO categorias (nome) VALUES ('Ganhos'), ('Gastos');

-- SUBCATEGORIAS
-- Criar tabela subcategorias
CREATE TABLE subcategorias (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE
);
-- Inserir em subcategorias
INSERT INTO subcategorias (nome, categoria_id) VALUES 
('Gastos Essenciais', 2), 
('Gastos Não Essenciais', 2),
('Salário', 1);

-- CLASSES
-- Criar tabela classes
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    subcategoria_id INTEGER REFERENCES subcategorias(id) ON DELETE CASCADE
);

-- Inserir em classes
INSERT INTO classes (nome, subcategoria_id) VALUES 
('Moradia', 1), 
('Lazer', 2), 
('Renda Fixa', 3);


-- SUBCLASSES
-- Criar tabela subclasses
CREATE TABLE subclasses (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE
);

-- Inserir em subclasses
INSERT INTO subclasses (nome, classe_id) VALUES 
('Aluguel', 1), 
('Conta de Luz', 1),
('Viagens', 2),
('Ações', 3);

