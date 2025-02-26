import React, { useState, useEffect, Fragment } from "react"; // Importa React e hooks para gerenciar o estado e efeitos
import { format } from "date-fns"; // Função para formatar datas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa ícones do FontAwesome
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'; // Ícone de lixeira (para deletar itens)
import { Modal, Button, Form } from 'react-bootstrap'; // Importação de componentes do Bootstrap para o layout (modal, botões, formulário)
import EditarDados from "../components/EditarTransacao"; // Importação do componente de edição (não utilizado no código aqui)
import ListarDados from "../components/ListarTransacao";
// import GraficoPizzaGastos from "./graficoGastos"; // Gráfico de Gastos (não usado no momento)
// import GraficoPizzaGanhos from "./graficoGanhos"; // Gráfico de Ganhos (não usado no momento)

const TransacoesPage = () => {

    return (
        <Fragment>
            <div className="TransacoesPage">
                <ListarDados></ListarDados>
            </div>
        </Fragment>
    )
}

export default TransacoesPage;