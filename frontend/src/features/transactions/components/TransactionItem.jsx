import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import EditarDados from '../../../components/Edit/Transaction/EditarDados';

export const TransactionItem = ({ transaction, onDelete, onEdit }) => {
  const formatarData = (dataString) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <tr>
      <td>{transaction.transacao_descricao}</td>
      <td>R$ {parseFloat(transaction.transacao_valor).toFixed(2)}</td>
      <td>{transaction.transacao_remetente_nome}</td>
      <td>{transaction.transacao_metodo_pagamento}</td>
      <td>{transaction.transacao_numero_parcelas}</td>
      <td>{transaction.transacao_conta_nome}</td>
      <td>{transaction.transacao_subcategoria_nome}</td>
      <td>{transaction.transacao_classe_nome}</td>
      <td>{transaction.transacao_subclasse_nome}</td>
      <td>{formatarData(transaction.transacao_data)}</td>
      <td>
        <Button variant="danger" onClick={() => onDelete(transaction.transacao_id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
        <EditarDados atualizarDados={onEdit} dado={transaction} />
      </td>
    </tr>
  );
};