DROP TABLE IF EXISTS classes CASCADE;

-- CRIAR TABELA CLASSES
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE, -- Nome único para cada classe
    descricao TEXT, -- Descrição opcional sobre a classe
    status BOOLEAN DEFAULT TRUE, -- Status da classe (ativa/inativa)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação da classe
    subcategoria_id INTEGER REFERENCES subcategorias(id) ON DELETE CASCADE -- Relacionamento com a tabela subcategorias
);


-- Inserir em classes
-- Inserindo dados de exemplo na tabela classes
INSERT INTO classes (nome, descricao, status, subcategoria_id) 
VALUES 
    -- Classes para a Subcategoria "Salário"
    ('Salário Mensal', 'Recebimento fixo mensal de salário ou remuneração de trabalho.', TRUE, 1),
    ('Bônus Anual', 'Bônus ou gratificação recebidos uma vez por ano.', TRUE, 1),

    -- Classes para a Subcategoria "Rendimentos de Investimentos"
    ('Dividendos de Ações', 'Lucros distribuídos por empresas de acordo com a quantidade de ações que o investidor possui.', TRUE, 2),
    ('Rendimentos de Fundos', 'Lucros provenientes de fundos de investimento, como fundos imobiliários (FIIs).', TRUE, 2),

    -- Classes para a Subcategoria "Vendas"
    ('Venda de Produto A', 'Receita proveniente da venda do produto A.', TRUE, 3),
    ('Venda de Produto B', 'Receita proveniente da venda do produto B.', TRUE, 3),
    
    -- Classes para a Subcategoria "Alimentação"
    ('Supermercado', 'Despesas com alimentos comprados no supermercado.', TRUE, 4),
    ('Restaurantes', 'Despesas com refeições em restaurantes e fast foods.', TRUE, 4),
    
    -- Classes para a Subcategoria "Transporte"
    ('Combustível', 'Despesas com combustível para carros, motos, etc.', TRUE, 5),
    ('Transporte Público', 'Despesas com transporte público, como ônibus e metrô.', TRUE, 5),
    
    -- Classes para a Subcategoria "Lazer"
    ('Cinema', 'Despesas com ingressos de cinema.', TRUE, 6),
    ('Viagens', 'Despesas relacionadas com viagens e turismo.', TRUE, 6),

    -- Classes para a Subcategoria "Contas de Consumo"
    ('Água e Esgoto', 'Despesas com contas de água e esgoto.', TRUE, 7),
    ('Energia Elétrica', 'Despesas com contas de energia elétrica.', TRUE, 7),
    ('Internet', 'Despesas com serviços de internet.', TRUE, 7),

    -- Classes para a Subcategoria "Empréstimos Pessoais"
    ('Empréstimo para Reforma', 'Empréstimo tomado para fazer reformas em casa.', TRUE, 8),
    ('Empréstimo para Emergências', 'Empréstimo tomado para cobrir despesas emergenciais.', TRUE, 8),

    -- Classes para a Subcategoria "Financiamento de Veículos"
    ('Financiamento Carro X', 'Financiamento para aquisição do carro X.', TRUE, 9),
    ('Financiamento Moto Y', 'Financiamento para aquisição da moto Y.', TRUE, 9),

    -- Classes para a Subcategoria "IPTU"
    ('IPTU Casa', 'Imposto sobre a propriedade da casa.', TRUE, 10),
    ('IPTU Terreno', 'Imposto sobre a propriedade de terreno.', TRUE, 10),

    -- Classes para a Subcategoria "IRPF"
    ('Imposto de Renda 2023', 'Imposto de Renda Pessoa Física referente ao ano de 2023.', TRUE, 11),
    ('Imposto de Renda 2024', 'Imposto de Renda Pessoa Física referente ao ano de 2024.', TRUE, 11);


-- Atualizar em classes
UPDATE classes
SET -- definir
    nome = 'Novo nome da classe', -- nome_coluna = 'valor_coluna'
    subcategoria_id = 'Id da subcategoria mãe'
WHERE
    id =  'Id do objeto que será atualizado';

DELETE classes WHERE id = 'Id do objeto que será deletado'
