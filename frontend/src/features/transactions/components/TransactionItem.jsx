// Importing React from the react library
import React from 'react';

// Importing the Button component from react-bootstrap
import { Button } from 'react-bootstrap';

// Importing the FontAwesomeIcon component from @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Importing the faTrashCan icon from @fortawesome/free-regular-svg-icons
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

// Importing the EditarDados component from a relative path
import EditarDados from '../../../components/Edit/Transaction/EditarDados';

// Exporting the TransactionItem component
export const TransactionItem = ({ transaction, onDelete, onEdit }) => {

  // Logging a message to the console to indicate the start of the TransactionItem logic
  console.log('Inicio lógica TransactionItem')

  // Defining a function to format a date string
  const formatarData = (dataString) => {
    // If the data string is empty, return an empty string
    if (!dataString) return "";
    
    // Create a new Date object from the data string
    const data = new Date(dataString);
    
    // Return the formatted date string in the pt-BR locale
    return data.toLocaleDateString('pt-BR');
  };

  // Logging the transaction data to the console
  console.log('Transações:', transaction);

  // Logging a message to the console to indicate the end of the TransactionItem logic
  console.log('Fim lógica TransactionItem')

  // Returning a table row element
  return (
    <tr>
      {/* // Table data element for the transaction description */}
      <td>{transaction.transacao_descricao}</td>
      
      {/* // Table data element for the transaction value, formatted as currency */}
      <td>R$ {parseFloat(transaction.transacao_valor).toFixed(2)}</td>
      
      {/* // Table data element for the payer name */}
      <td>{transaction.transacao_remetente_nome}</td>
      
      {/* // Table data element for the payment method description */}
      <td>{transaction.transacao_metodo_pagamento_descricao}</td>
      
      {/* // Table data element for the number of installments */}
      <td>{transaction.transacao_parcelas}</td>
      
      {/* // Table data element for the account name */}
      <td>{transaction.transacao_conta_nome}</td>
      
      {/* // Table data element for the subcategory name */}
      <td>{transaction.transacao_subcategoria_nome}</td>
      
      {/* // Table data element for the class name */}
      <td>{transaction.transacao_classe_nome}</td>
      
      {/* // Table data element for the subclass name */}
      <td>{transaction.transacao_subclasse_nome}</td>
      
      {/* // Table data element for the launch date, formatted using the formatarData function */}
      <td>{formatarData(transaction.transacao_data_lancamento)}</td>
      
      {/* // Table data element for the action buttons */}
      <td>
        {/* // Delete button with a trash can icon, calling the onDelete function when clicked */}
        <Button variant="danger" onClick={() => onDelete(transaction.transacao_id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
        
        {/* // EditarDados component for editing the transaction, passing the onEdit function and transaction data as props */}
        <EditarDados atualizarDados={onEdit} dado={transaction} />
      </td>
    </tr>
  );
};