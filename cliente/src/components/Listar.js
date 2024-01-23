import React, { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import EditarDados from "./Editar";

const ListarDados = () => {
    const [ dados, definirDados ] = useState([])

    const deletarDado = async (id) => {
        try {
          const deletarDado = await fetch(`http://localhost:5000/financial-management/${id}`, {
            method: 'DELETE',
          });
    
          definirDados(dados.filter((dado) => dado.id !== id));
        } catch (error) {
          console.log(error);
        }
      };

    const obterDados = async () => {
        try {
            const resposta = await fetch('http://localhost:5000/financial-management')
            const dadosJson = await resposta.json()
            
            definirDados(dadosJson)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obterDados()
    }, [])

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

     // Condição para exibir o elemento se dadosGastos não for vazio
     let totalGastosElement = null;
     if (dadosGastos.length > 0) {
         totalGastosElement = 
         <div className="List__gastos">
                <h3>Gastos</h3>
                <table className="table mt-5 text-center">
                    {/* ... (cabeçalho e corpo da tabela) */}
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            {/* <th>Método</th> */}
                            {/* <th>Remetente</th> */}
                            {/* <th>Categoria</th> */}
                            {/* <th>Subcategoria</th> */}
                            {/* <th>Classe</th> */}
                            {/* <th>Subclasse</th> */}
                            <th>Data</th>
                            {/* <th>Sincronário</th>
                            <th>Plasma Radial</th>
                            <th>Heptal</th>
                            <th>Lua</th> */}
                            <th>Editar</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosGastos.map(dado => (
                                <tr key={dado.id}>
                                    <td>{dado.descricao}</td>
                                    <td>R${parseFloat(dado.valor).toFixed(2)}</td>
                                    {/* <td>{dado.metodo}</td> */}
                                    {/* <td>{dado.remetente}</td> */}
                                    {/* <td>{dado.categoria}</td> */}
                                    {/* <td>{dado.subcategoria}</td> */}
                                    {/* <td>{dado.classe}</td> */}
                                    {/* <td>{dado.subclasse}</td> */}
                                    <td>{format(new Date(dado.data_gregoriana), 'dd/MM')}</td>
                                    {/* <td>{dado.sincronario}</td>
                                    <td>{dado.plasma}</td>
                                    <td>{dado.heptal}</td>
                                    <td>{dado.lua}</td> */}
                                    <td>
                                        <EditarDados dado={dado}/>  
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={
                                                () => deletarDado(dado.id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff", fontSize: "17px"}} />
                                        </button>    
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <h5>Total Gastos: R${calcularTotal(dadosGastos)}</h5>                
            </div>
     }

     // Condição para exibir o elemento se dadosGastos não for vazio
     let totalGanhosElement = null;
     if (dadosGanhos.length > 0) {
         totalGanhosElement = 
         <div className="List__ganhos">
                <h3>Ganhos</h3>
                <table className="table mt-5 text-center">
                    {/* ... (cabeçalho e corpo da tabela) */}
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            {/* <th>Método</th> */}
                            {/* <th>Remetente</th> */}
                            {/* <th>Categoria</th> */}
                            {/* <th>Subcategoria</th> */}
                            {/* <th>Classe</th> */}
                            {/* <th>Subclasse</th> */}
                            <th>Data</th>
                            {/* <th>Sincronário</th>
                            <th>Plasma Radial</th>
                            <th>Heptal</th>
                            <th>Lua</th> */}
                            <th>Editar</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosGanhos.map((dado) =>  (          
                                <tr key={dado.id}>
                                    <td>{dado.descricao}</td>
                                    <td>R${parseFloat(dado.valor).toFixed(2)}</td>
                                    {/* <td>{dado.metodo}</td> */}
                                    {/* <td>{dado.remetente}</td> */}
                                    {/* <td>{dado.categoria}</td> */}
                                    {/* <td>{dado.subcategoria}</td> */}
                                    {/* <td>{dado.classe}</td> */}
                                    {/* <td>{dado.subclasse}</td> */}
                                    <td>{format(new Date(dado.data_gregoriana), 'dd/MM')}</td>
                                    {/* <td>{dado.sincronario}</td>
                                    <td>{dado.plasma}</td>
                                    <td>{dado.heptal}</td>
                                    <td>{dado.lua}</td> */}
                                    <td>
                                        <EditarDados dado={dado}/>  
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={
                                                () => deletarDado(dado.id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff", fontSize: "17px"}} />
                                        </button>    
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <h5>Total Gastos: R${calcularTotal(dadosGanhos)}</h5>
            </div>
     }

    //   // Função para calcular o total dos valores com a categoria "gastos"
    //   const calcularTotalGastos = () => {
    //     const gastos = dados.filter(dado => dado.categoria === 'Gastos');
    //     return gastos.reduce((total, dado) => total + parseFloat(dado.valor), 0).toFixed(2);
    // };

    return (
        <Fragment>
            <div className="List">
                {totalGastosElement}
                {totalGanhosElement}
            </div>
        </Fragment>
    )
}

export default ListarDados;