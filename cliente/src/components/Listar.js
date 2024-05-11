import React, { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import EditarDados from "./Editar";

const ListarDados = () => {
    const [ dados, definirDados ] = useState([])

    const deletarDado = async (id) => {
        try {
          const deletarDado = await fetch(`http://127.0.0.1:5001/gerenciador-financeiro/${id}`, {
            method: 'DELETE',
          });
    
          definirDados(dados.filter((dado) => dado.id !== id));
        } catch (error) {
          console.log(error);
        }
      };

    const obterDados = async () => {
        try {
            const resposta = await fetch('http://127.0.0.1:5001/gerenciador-financeiro/')
            const dadosJson = await resposta.json()
            
            definirDados(dadosJson)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obterDados()
    }, [])
    
    const formatarData = (data) => {
        if (!data) return ""; // Tratamento para data vazia

        // Convertendo a string para um objeto de data JavaScript
        const dataFormatada = new Date(data);

        // Formatando a data conforme necessário
        return format(dataFormatada, 'dd/MM/yyyy');
    };

    const totalGastosElement = dados.filter(dado => dado.categoria === 'Gastos').map(dado => (
        <tr key={dado.id}>
            <td>{dado.descricao}</td>
            <td>R${parseFloat(dado.valor).toFixed(2)}</td>
            <td>{formatarData(dado.datagregoriana)}</td>
            <td>
                <EditarDados dado={dado} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deletarDado(dado.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff", fontSize: "17px" }} />
                </button>
            </td>
        </tr>
    ));

    const totalGanhosElement = dados.filter(dado => dado.categoria === 'Ganhos').map(dado => (
        <tr key={dado.id}>
            <td>{dado.descricao}</td>
            <td>R${parseFloat(dado.valor).toFixed(2)}</td>
            <td>{formatarData(dado.datagregoriana)}</td>
            <td>
                <EditarDados dado={dado} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deletarDado(dado.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff", fontSize: "17px" }} />
                </button>
            </td>
        </tr>
    ));
    
    // Função para calcular o total dos valores
    // const calcularTotal = () => {
    //     return dados.reduce((total, dado) => total + parseFloat(dado.valor), 0).toFixed(2);
    // };
     // Filtrar os dados por categoria
     const dadosGastos = dados.filter(dado => dado.categoria === 'Gastos');
     const dadosGanhos = dados.filter(dado => dado.categoria === 'Ganhos');
 
     // Função para calcular o total dos valores
    const calcularTotal = (lista) => {
        return lista.reduce((total, dado) => total + parseFloat(dado.valor), 0).toFixed(2);
    };


    //   // Função para calcular o total dos valores com a categoria "gastos"
    //   const calcularTotalGastos = () => {
    //     const gastos = dados.filter(dado => dado.categoria === 'Gastos');
    //     return gastos.reduce((total, dado) => total + parseFloat(dado.valor), 0).toFixed(2);
    // };

    return (
        <Fragment>
            <div className="List">
                <div className="List__gastos">
                    <h3>Gastos</h3>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Editar</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalGastosElement}
                        </tbody>
                    </table>
                    <h5>Total Gastos: R${calcularTotal(dadosGastos)}</h5>
                </div>
                {/* Código similar para exibir total de ganhos */}
                <div className="List__ganhos">
                    <h3>Ganhos</h3>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Editar</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalGanhosElement}
                        </tbody>
                    </table>
                    <h5>Total Ganhos: R${calcularTotal(dadosGanhos)}</h5>
                </div>
            </div>
        </Fragment>
    )
}

export default ListarDados;