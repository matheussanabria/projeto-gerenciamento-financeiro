
DROP TABLE IF EXISTS subclasses CASCADE;

-- CRIAR TABELA SUBCLASSES
CREATE TABLE subclasses (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE, -- Nome único para cada subclasse
    descricao TEXT, -- Descrição opcional sobre a subclasse
    status BOOLEAN DEFAULT TRUE, -- Status da subclasse (ativa/inativa)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação da subclasse
    classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE -- Relacionamento com a tabela classes
);

-- Inserir em subclasses
-- Inserindo dados de exemplo na tabela subclasses
INSERT INTO subclasses (nome, descricao, status, classe_id) 
VALUES 
    -- Subclasses para a Classe "Salário Mensal"
    ('Salário Base', 'Valor fixo mensal acordado de salário.', TRUE, 1),
    ('Comissão', 'Comissão adicional por metas ou vendas realizadas.', TRUE, 1),

    -- Subclasses para a Classe "Bônus Anual"
    ('Bônus de Fim de Ano', 'Bônus recebido ao final do ano como incentivo.', TRUE, 2),
    ('Bônus de Produtividade', 'Bônus por desempenho acima da média.', TRUE, 2),

    -- Subclasses para a Classe "Dividendos de Ações"
    ('Dividendos Ações XYZ', 'Lucros recebidos com ações da empresa XYZ.', TRUE, 3),
    ('Dividendos Ações ABC', 'Lucros recebidos com ações da empresa ABC.', TRUE, 3),

    -- Subclasses para a Classe "Rendimentos de Fundos"
    ('Rendimentos Fundo A', 'Lucros provenientes de investimentos no Fundo A.', TRUE, 4),
    ('Rendimentos Fundo B', 'Lucros provenientes de investimentos no Fundo B.', TRUE, 4),

    -- Subclasses para a Classe "Venda de Produto A"
    ('Venda Produto A Loja 1', 'Venda realizada da linha de produtos A na loja 1.', TRUE, 5),
    ('Venda Produto A Loja 2', 'Venda realizada da linha de produtos A na loja 2.', TRUE, 5),

    -- Subclasses para a Classe "Venda de Produto B"
    ('Venda Produto B Loja 1', 'Venda realizada da linha de produtos B na loja 1.', TRUE, 6),
    ('Venda Produto B Loja 2', 'Venda realizada da linha de produtos B na loja 2.', TRUE, 6),

    -- Subclasses para a Classe "Supermercado"
    ('Alimentos Básicos', 'Despesas com alimentos como arroz, feijão, etc.', TRUE, 7),
    ('Produtos de Higiene', 'Despesas com produtos de higiene pessoal e limpeza.', TRUE, 7),

    -- Subclasses para a Classe "Restaurantes"
    ('Almoço em Restaurante X', 'Despesas com almoço em restaurante X.', TRUE, 8),
    ('Jantar em Restaurante Y', 'Despesas com jantar em restaurante Y.', TRUE, 8),

    -- Subclasses para a Classe "Combustível"
    ('Combustível Gasolina', 'Despesas com abastecimento de gasolina.', TRUE, 9),
    ('Combustível Álcool', 'Despesas com abastecimento de álcool.', TRUE, 9),

    -- Subclasses para a Classe "Transporte Público"
    ('Ônibus Linha 101', 'Despesas com transporte público utilizando o ônibus linha 101.', TRUE, 10),
    ('Metrô Linha Azul', 'Despesas com transporte público utilizando a linha azul do metrô.', TRUE, 10),

    -- Subclasses para a Classe "Cinema"
    ('Ingresso Cinema', 'Despesas com ingresso para sessões de cinema.', TRUE, 11),
    ('Lanches Cinema', 'Despesas com lanches e bebidas durante sessões de cinema.', TRUE, 11),

    -- Subclasses para a Classe "Viagens"
    ('Passagens Aéreas', 'Despesas com passagens aéreas para viagens de férias.', TRUE, 12),
    ('Hospedagem', 'Despesas com hospedagem em hotéis durante viagens.', TRUE, 12),

    -- Subclasses para a Classe "Água e Esgoto"
    ('Conta Água Residencial', 'Despesas com o fornecimento de água para residência.', TRUE, 13),
    ('Conta Água Comercial', 'Despesas com o fornecimento de água para o estabelecimento comercial.', TRUE, 13),

    -- Subclasses para a Classe "Energia Elétrica"
    ('Conta Luz Residencial', 'Despesas com energia elétrica na residência.', TRUE, 14),
    ('Conta Luz Comercial', 'Despesas com energia elétrica no estabelecimento comercial.', TRUE, 14),

    -- Subclasses para a Classe "Internet"
    ('Internet Residencial', 'Despesas com serviço de internet para uso doméstico.', TRUE, 15),
    ('Internet Comercial', 'Despesas com serviço de internet para uso no estabelecimento comercial.', TRUE, 15),

    -- Subclasses para a Classe "Empréstimo para Reforma"
    ('Reforma Banheiro', 'Empréstimo tomado para reforma do banheiro.', TRUE, 16),
    ('Reforma Cozinha', 'Empréstimo tomado para reforma da cozinha.', TRUE, 16),

    -- Subclasses para a Classe "Empréstimo para Emergências"
    ('Emergência Médica', 'Empréstimo tomado para cobrir despesas emergenciais médicas.', TRUE, 17),
    ('Emergência Acidente', 'Empréstimo tomado para cobrir despesas com acidente.', TRUE, 17),

    -- Subclasses para a Classe "Financiamento Carro X"
    ('Financiamento Carro X - Parcelas', 'Despesas mensais com o financiamento do Carro X.', TRUE, 18),
    ('Financiamento Carro X - Juros', 'Juros pagos sobre o financiamento do Carro X.', TRUE, 18),

    -- Subclasses para a Classe "Financiamento Moto Y"
    ('Financiamento Moto Y - Parcelas', 'Despesas mensais com o financiamento da Moto Y.', TRUE, 19),
    ('Financiamento Moto Y - Juros', 'Juros pagos sobre o financiamento da Moto Y.', TRUE, 19),

    -- Subclasses para a Classe "IPTU Casa"
    ('IPTU Casa 2023', 'Imposto pago sobre a propriedade da casa em 2023.', TRUE, 20),
    ('IPTU Casa 2024', 'Imposto pago sobre a propriedade da casa em 2024.', TRUE, 20),

    -- Subclasses para a Classe "IPTU Terreno"
    ('IPTU Terreno 2023', 'Imposto pago sobre a propriedade do terreno em 2023.', TRUE, 21),
    ('IPTU Terreno 2024', 'Imposto pago sobre a propriedade do terreno em 2024.', TRUE, 21),

    -- Subclasses para a Classe "Imposto de Renda 2023"
    ('Imposto de Renda 2023 - Retido na Fonte', 'Imposto de Renda pago de forma retida na fonte.', TRUE, 22),
    ('Imposto de Renda 2023 - Parcelado', 'Imposto de Renda pago parcelado em 2023.', TRUE, 22),

    -- Subclasses para a Classe "Imposto de Renda 2024"
    ('Imposto de Renda 2024 - Retido na Fonte', 'Imposto de Renda pago de forma retida na fonte.', TRUE, 23),
    ('Imposto de Renda 2024 - Parcelado', 'Imposto de Renda pago parcelado em 2024.', TRUE, 23);


