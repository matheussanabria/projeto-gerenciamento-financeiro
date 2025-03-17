import React from 'react';
import { TransactionItem } from './TransactionItem';

export const TransactionList = ({ 
  transactions, 
  activeTab, 
  categorias, // Adicione esta prop
  onDelete, 
  onEdit 
}) => {
  // Encontra o ID da categoria ativa
  const categoriaAtiva = categorias.find(
    cat => cat.categoria_nome === activeTab
  );

  // Filtra transações pelo ID da categoria
  const filteredTransactions = transactions.filter(
    t => t.transacao_categoria_nome === categoriaAtiva?.categoria_nome
  );

  // Renderização condicional para segurança
  if (!categoriaAtiva) return <div>Selecione uma categoria válida</div>;
  const calcularTotal = () => {
    return filteredTransactions
      .reduce((total, t) => total + parseFloat(t.transacao_valor), 0)
      .toFixed(2);
  };
  
  console.log('Transações:', transactions[0]);

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
      <h3 className="total-categoria mt-4">
        Total: R$ {calcularTotal()}
      </h3>
    </div>
  );
};