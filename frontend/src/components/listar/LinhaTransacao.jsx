import React, { useState, useEffect, Fragment } from "react"; // Importa React e hooks para gerenciar o estado e efeitos

const LinhaTransacao = ({ transacao }) => {

    return (
        <Fragment>
            <tr>
                <td>{transacao.transacao_descricao}</td>
                <td>{transacao.transacao_valor}</td>
                <td>{transacao.transacao_remetente_nome}</td>
                <td>{transacao.transacao_metodo_pagamento_nome}</td>
                <td>{transacao.transacao_numero_parcelas}</td>
                <td>{transacao.transacao_conta_nome}</td>
                <td>{transacao.transacao_categoria_nome}</td>
                <td>{transacao.transacao_subcategoria_nome}</td>
                <td>{transacao.transacao_classe_nome}</td>
                <td>{transacao.transacao_subclasse_nome}</td>
                <td>{transacao.transacao_data_lancamento}</td>
            </tr>
        </Fragment>
    )
}

export default LinhaTransacao;