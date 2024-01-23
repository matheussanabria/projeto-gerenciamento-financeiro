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