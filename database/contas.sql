
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
