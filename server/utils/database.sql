-- Scripts para criação e manutenção do banco de dados

-- Passo 1: Criar banco de dados
CREATE DATABASE gerenciamento_financeiro; -- Criar banco de dados nome_banco_de_dados

-- Passo 2: Criar tabelas 
    -- Tabela metodos_pagamento
    -- Tabela cartoes
    -- Tabela bandeira_cartoes
    -- Tabela metodos_parcelamento
    -- Tabela contas
    -- Tabela remetentes
    -- Tabela categorias
    -- Tabela subcategorias
    -- Tabela classes
    -- Tabela subclasses
    -- Tabela transacoes
    -- Tabela estoque
    -- Tabela movimentacoes_estoque
    -- Tabela caixa_comandas
    -- Tabela profissionais
    -- Tabela especialidades
    -- Tabela agenda


---

-- CRIAR TABELA REMENTENTES
DROP TABLE IF EXISTS remetentes CASCADE;
-- Tabela de Remetentes otimizada
CREATE TABLE remetentes (
    rementente_id SERIAL PRIMARY KEY,
    rementente_nome VARCHAR(255) NOT NULL,
    rementente_cpf_cnpj VARCHAR(14) UNIQUE CHECK (rementente_cpf_cnpj ~ '^[0-9]{11,14}$'), -- Validação simples para CPF ou CNPJ
    rementente_endereco TEXT,
    rementente_telefone VARCHAR(20) CHECK (rementente_telefone ~ '^[0-9]+$'), -- Garante apenas números no telefone
    rementente_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para melhorar buscas pelo NOME; CPF/CNPJ; TELEFONE 
CREATE INDEX idx_remetente_nome ON remetentes (rementente_nome);
CREATE INDEX idx_remetente_cpf_cnpj ON remetentes (rementente_cpf_cnpj);
CREATE INDEX idx_remetente_telefone ON remetentes (rementente_telefone);



-- listar remetente
SELECT * FROM remetentes;

-- inserir em remetente
INSERT INTO remetentes (rementente_nome, rementente_cpf_cnpj, rementente_endereco, rementente_telefone) VALUES 
('João da Silva', '12345678901', 'Rua das Flores, 123 - São Paulo, SP', '11987654321'),
('Empresa XPTO Ltda.', '12345678000195', 'Av. Paulista, 1000 - São Paulo, SP', '1133224455'),
('Maria Oliveira', '98765432100', 'Rua dos Limoeiros, 45 - Rio de Janeiro, RJ', '21999988877');


-- atualizar remetente
UPDATE remetentes
SET -- definir
    rementente_nome = 'Ana Costa', -- nome_coluna = 'valor_coluna'
    rementente_cpf_cnpj = '321.654.987-11',
    rementente_endereco = 'Travessa D, 321, Vila Nova',
    rementente_telefone = '(11) 92345-6789'
WHERE
    rementente_nome = 'João da Silva' AND rementente_cpf_cnpj = '123.456.789-09';

-- deletar remetente
DELETE FROM remetentes WHERE remetente_id = 'Id do objeto que será deletado';

---


-- CRIAR TABELA METODOS_PAGAMENTO
DROP IF EXISTS metodos_pagamento CASCADE;-- Excluir tabela se existir nome_tabela CASCADE (mesmo que existam dependencias externas)

-- 1️⃣ Formas de Pagamento (Definição Geral)
CREATE TABLE formas_pagamento (
    forma_pagamento_id SERIAL PRIMARY KEY,
    forma_pagamento_nome TEXT NOT NULL UNIQUE CHECK (nome IN ('Dinheiro', 'Pix', 'Débito', 'Crédito', 'Fiado', 'Saldo'))
);

-- 2️⃣ Bandeiras de Cartão (Para Métodos de Pagamento do Tipo "Cartão")
CREATE TABLE bandeiras_cartao (
    bandeira_cartao_id SERIAL PRIMARY KEY,
    bandeira_cartao_nome TEXT NOT NULL UNIQUE CHECK (nome IN ('VISA', 'Mastercard', 'Elo', 'American Express', 'Hipercard', 'Diners', 'Outros'))
);

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



-- CRIAR TABELA CONTAS
CREATE TABLE contas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE, -- Nome da conta (ex.: "Conta Corrente", "Poupança")
    saldo NUMERIC(10, 2) NOT NULL DEFAULT 0.00, -- Permite saldo negativo se necessário
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índice para otimizar buscas por nome
CREATE INDEX idx_contas_nome ON contas (nome);


-- const pagarConta = async (contaId, valorPagamento) => {
--     const conta = await buscarConta(contaId);

--     if (conta.saldo < valorPagamento) {
--         throw new Error("Saldo insuficiente!");
--     }

--     const novoSaldo = conta.saldo - valorPagamento;
--     await atualizarSaldo(contaId, novoSaldo);
--     return "Pagamento realizado com sucesso!";
-- };

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



-- Passo 3: Criar tabela transacoes (receberá as estrangeiras)

-- PgAdmin
DROP TABLE IF EXISTS transacoes CASCADE; -- Excluir tabela se existir nome_tabela CASCADE (mesmo que existam dependencias externas)

-- CRIAR TABELA TRANSACOES
    CREATE TABLE transacoes (
        id SERIAL PRIMARY KEY,
        descricao TEXT NOT NULL,
        valor NUMERIC(10, 2) NOT NULL CHECK (valor >= 0), -- Evita valores negativos
        remetente_id INT, 
        metodo_pagamento_id INT,
        parcelamento_id INT,
        conta_id INT,
        categoria_id INT,
        subcategoria_id INT,
        classe_id INT,
        subclasse_id INT,
        data DATE NOT NULL DEFAULT CURRENT_DATE,
        
        -- Definição de Chaves Estrangeiras com regras de exclusão
        FOREIGN KEY (remetente_id) REFERENCES remetentes(id) ON DELETE SET NULL,
        FOREIGN KEY (metodo_pagamento_id) REFERENCES metodos_pagamento(id) ON DELETE SET NULL,
        FOREIGN KEY (parcelamento_id) REFERENCES parcelamentos(id) ON DELETE SET NULL,
        FOREIGN KEY (conta_id) REFERENCES contas(id) ON DELETE CASCADE, -- Caso a conta seja removida, remove as transações
        FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
        FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id) ON DELETE SET NULL,
        FOREIGN KEY (classe_id) REFERENCES classes(id) ON DELETE SET NULL,
        FOREIGN KEY (subclasse_id) REFERENCES subclasses(id) ON DELETE SET NULL
    );

    -- Índices para otimização de buscas frequentes
    CREATE INDEX idx_transacoes_data ON transacoes (data);
    CREATE INDEX idx_transacoes_categoria ON transacoes (categoria_id);
    CREATE INDEX idx_transacoes_conta ON transacoes (conta_id);



-- inserir em transacoes
-- Exemplo 1: Receita com pagamento via crédito
INSERT INTO transacoes (descricao, valor, data, categoria_id, subcategoria_id, classe_id, subclasse_id, metodo_pagamento_id, conta_id)
VALUES ('Coloração', 100.00, '2025-01-14', 1, 5, 5, 5, 22, 5);

INSERT INTO transacoes (descricao, valor, remetente_id, metodo_pagamento_id, conta_id, categoria_id, subcategoria_id, classe_id, subclasse_id, data) VALUES 
('Aluguel 09/24', 800.00, 1, '2024-09-15', 2, 1, 1, 1, 2),
('Salário 09/24', 1000.00, 1, '2024-09-20', 1, 3, 3, 4, 2),
('Conta de Luz 09/24', 150.00, 2, '2024-09-20', 2, 1, 1, 2, 2);


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
VALUES 
    ('Compra supermercado', 150.75, 1, 3, NULL, 1, 2, 4, 7, 13, '2025-02-01');
	
-- Verificando as inserções
SELECT * FROM transacoes;
-- view personalizada da tabela transacoes 
SELECT 
    t.id AS transacao_id,
    t.descricao AS transacao_descricao,
    t.valor,
	r.nome AS remetente_nome,
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
