
DROP TABLE IF EXISTS categorias CASCADE;

-- CRIAR TABELA CATEGORIAS
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT, -- Descrição opcional sobre a categoria
    status BOOLEAN DEFAULT TRUE, -- Status da categoria (ativa/inativa)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de criação da categoria
);

-- inserir em categorias
-- Inserindo dados de exemplo na tabela categorias
INSERT INTO categorias (nome, descricao, status) 
VALUES 
    ('Receitas', 'Todas as fontes de entrada de dinheiro no sistema, como salários, rendimentos e investimentos.', TRUE),
    ('Despesas', 'Despesas gerais, como contas de consumo, alimentação, transporte e lazer.', TRUE),
    ('Investimentos', 'Categoria para gerenciamento de investimentos e aplicações financeiras.', TRUE),
    ('Empréstimos', 'Empréstimos ou financiamentos, tanto tomados quanto concedidos.', TRUE),
    ('Impostos', 'Despesas relacionadas ao pagamento de impostos, taxas e contribuições.', TRUE);

