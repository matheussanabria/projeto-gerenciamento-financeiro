import React, { useState, useEffect } from 'react';

const HierarquiasPage = () => {
// Outros estados que armazenam listas de opções para preencher os campos do formulário
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subclasses, setSubclasses] = useState([]);

    // Função para deletar um dado, enviando uma requisição para o backend
    const deletarDado = async (id) => {
        try {
          await fetch(`http://localhost:5001//${id}`, {
            method: 'DELETE', // Método HTTP para deletar
          });
          // Após deletar, remove o dado da lista
          definirDados(dados.filter((dado) => dado.id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    // Função para obter as opções (dados das listas de remetentes, métodos de pagamento, etc.)
    const obterOpcoes = async () => {
        try {
            // Requisições para pegar dados do backend
            const categoriasResposta = await fetch('http://localhost:5001/categorias/');
            const subcategoriasResposta = await fetch('http://localhost:5001/subcategorias/');
            const classesResposta = await fetch('http://localhost:5001/classes/');
            const subclassesResposta = await fetch('http://localhost:5001/subclasses/');

            // Converte a resposta em JSON (formato que o React pode entender)
            const categoriasJson = await categoriasResposta.json();
            const subcategoriasJson = await subcategoriasResposta.json();
            const classesJson = await classesResposta.json();
            const subclassesJson = await subclassesResposta.json();

            setCategorias(categoriasJson);
            setSubcategorias(subcategoriasJson);
            setClasses(classesJson);
            setSubclasses(subclassesJson);

            // Define as abas com base nas categorias recebidas
            definirAbas(categoriasJson);

            // Define a primeira aba como ativa
            if (categoriasJson && categoriasJson.length > 0) {
                definirAbaAtiva(categoriasJson[0].categoria_nome);
            } else {
                console.error("Erro: Nenhuma categoria encontrada.");
            }

        } catch (error) {
            console.log(error);
        }
    };
}

export default HierarquiasPage();