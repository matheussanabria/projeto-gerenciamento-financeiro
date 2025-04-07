
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