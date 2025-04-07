// Importing React library and TransactionItem component
import React from 'react';
import { TransactionItem } from './TransactionItem';

// Defining the TransactionList component
export const TransactionList = ({
  // Properties passed to the component
  transactions, // List of transactions
  activeTab, // ID of the currently active category
  categorias, // List of categories
  onDelete, // Function to delete a transaction
  onEdit // Function to edit a transaction
}) => {
  // Printing a message to the console to indicate the start of the component's logic
  console.log('Inicio lógica TransactionList');

  // Finding the active category based on the activeTab ID
  const categoriaAtiva = categorias.find(
    cat => cat.categoria_id === activeTab
  );
  // Printing the active category to the console
  console.log('Categoria ativa: ', categoriaAtiva);

  // Finding the current category (this line is redundant and can be removed)
  const currentCategory = categorias.find(
    cat => cat.categoria_id === activeTab
  );;
  // Printing the current category to the console (this line can be removed)
  console.log('Categoria Atual: ', currentCategory);

  // Filtering transactions based on the active category ID
  const filteredTransactions = transactions.filter(
    t => t.transacao_categoria_id === categoriaAtiva?.categoria_id
  );
  // Printing the filtered transactions to the console
  console.log('Transações filtradas: ', filteredTransactions);

  // Conditional rendering for security purposes: if no active category, display a message
  if (!categoriaAtiva) return <div>Selecione uma categoria válida</div>;

  // Defining a function to calculate the total value of the filtered transactions
  const calcularTotal = () => {
    return filteredTransactions
      .reduce((total, t) => total + parseFloat(t.transacao_valor), 0)
      .toFixed(2);
  };

  // Printing the first transaction to the console (this line can be removed)
  console.log('Transações:', transactions[0]);

  // Printing a message to the console to indicate the end of the component's logic
  console.log('Final lógica TransactionList');

  // Returning the JSX elements that make up the component
  return (
    <div className="transaction-list">
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Remetente</th>
            <th>Método Pag.</th>
            <th>Parcelas</th>
            <th>Conta</th>
            <th>Subcategoria</th>
            <th>Classe</th>
            <th>Subclasse</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <TransactionItem
              key={transaction.transacao_id}
              transaction={transaction}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
      <h3 className="total-categoria">
        Total: R$ {calcularTotal()}
      </h3>
    </div>
  );
};