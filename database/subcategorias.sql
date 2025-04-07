
DROP TABLE IF EXISTS subcategorias CASCADE;

-- CRIAR TABELA SUBCATEGORIAS
CREATE TABLE subcategorias (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE, -- Nome único para cada subcategoria
    descricao TEXT, -- Descrição opcional sobre a subcategoria
    status BOOLEAN DEFAULT TRUE, -- Status da subcategoria (ativa/inativa)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação da subcategoria
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE -- Relacionamento com a tabela categorias
);

-- Inserir em subcategorias
-- Inserindo dados de exemplo na tabela subcategorias
INSERT INTO subcategorias (nome, descricao, status, categoria_id) 
VALUES 
    -- Subcategorias para Receitas
    ('Salário', 'Receita proveniente de salário ou remuneração pelo trabalho.', TRUE, 1),
    ('Rendimentos de Investimentos', 'Lucros ou dividendos recebidos de investimentos financeiros.', TRUE, 1),
    ('Vendas', 'Receitas provenientes da venda de produtos ou serviços.', TRUE, 1),

    -- Subcategorias para Despesas
    ('Alimentação', 'Despesas relacionadas com a compra de alimentos e refeições.', TRUE, 2),
    ('Transporte', 'Despesas com deslocamentos, como gasolina, transporte público, Uber, etc.', TRUE, 2),
    ('Lazer', 'Despesas com atividades recreativas, como cinema, viagens e entretenimento.', TRUE, 2),
    ('Contas de Consumo', 'Despesas mensais como água, luz, telefone, internet e gás.', TRUE, 2),

    -- Subcategorias para Investimentos
    ('Ações', 'Investimentos em ações da bolsa de valores ou mercados financeiros.', TRUE, 3),
    ('Fundos Imobiliários', 'Investimentos em fundos imobiliários (FIIs).', TRUE, 3),
    ('Tesouro Direto', 'Investimentos no Tesouro Direto, por meio de títulos públicos.', TRUE, 3),

    -- Subcategorias para Empréstimos
    ('Empréstimos Pessoais', 'Empréstimos tomados por pessoas físicas para necessidades pessoais.', TRUE, 4),
    ('Financiamento de Veículos', 'Empréstimos destinados à compra de veículos, como carros e motos.', TRUE, 4),

    -- Subcategorias para Impostos
    ('IPTU', 'Imposto sobre a propriedade de imóveis, como casas e terrenos.', TRUE, 5),
    ('IRPF', 'Imposto de Renda Pessoa Física, pago anualmente sobre a renda tributável.', TRUE, 5);

