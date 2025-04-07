// Importing components and hooks
import { LoadingSpinner } from '../components/Loading/LoadingSpinner';
import { ErrorDisplay } from '../components/Error/ErrorDisplay';
import Header from '../components/Header/Header';
import { useState, useEffect, React, Fragment } from 'react';
import axios from "axios";
import { useTransactions } from '../features/transactions/hooks/useTransactions';

// Importing transaction-related components
import { TransactionTabs } from '../features/transactions/components/TransactionTabs';
import { TransactionList } from '../features/transactions/components/TransactionList';
import { TransactionForm } from '../features/transactions/components/TransactionForm/TransactionForm';

// Defining the TransactionsPage component
const TransactionsPage = () => {
  console.log('Inicio lógica TransactionsPage');

  // Using the useTransactions hook to get transactions, lookups, loading, error, and refetch
  const { transactions, lookups, loading, error, refetch } = useTransactions();

  // Logging the structure of lookups
  console.log('Estrutura do lookups:', lookups);

  // Initializing state variables
  const [activeTab, setActiveTab] = useState(1);
  const [showForm, setShowForm] = useState(false);

  // Handling tab changes
  const onTabChange = (tab) => {
    console.log('Active tab changed:', tab);
    setActiveTab(tab);
  };

  // Toggling the form visibility
  const onToggleForm = () => {
    setShowForm(!showForm);
  };

  // Removed code for loading categories (moved to a separate effect?)

  // Handling form submission
  const handleSubmit = async (formData) => {
    try {
      // Creating a payload with formatted data
      const payload = {
        ...formData,
        transacao_remetente_id: Number(formData.transacao_remetente_id),
        transacao_metodo_pagamento_id: Number(formData.transacao_metodo_pagamento_id),
        transacao_forma_parcelamento_id: Number(formData.transacao_forma_parcelamento_id),
        transacao_conta_id: Number(formData.transacao_conta_id),
        transacao_categoria_id: Number(formData.transacao_categoria_id),
        transacao_subcategoria_id: Number(formData.transacao_subcategoria_id),
        transacao_classe_id: Number(formData.transacao_classe_id),
        transacao_subclasse_id: Number(formData.transacao_subclasse_id),
        transacao_valor: parseFloat(formData.transacao_valor)
      };
      // Posting the payload to the server
      await axios.post('http://localhost:5001/transacoes', payload);
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error('Erro:', err.response?.data);
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error.message} />;

   // Calcular a categoria ativa baseada na aba selecionada
   const currentCategory = lookups.categorias?.find(
    cat => cat.categoria_id === activeTab
  );

  console.log('Fim lógica TransactionsPage');

  // Returning the JSX elements
  return (
    <Fragment>
      <Header></Header>
      <div className="componenteListar">
        <TransactionTabs
          categorias={Array.isArray(lookups.categorias) ? lookups.categorias : []} // Defesa dupla
          activeTab={activeTab}
          onTabChange={onTabChange}
          onToggleForm={onToggleForm}
        />
        {showForm && (
          <TransactionForm
            currentCategory={currentCategory}
            show={showForm}
            onHide={() => setShowForm(false)}
            lookups={lookups}
            onSubmit={handleSubmit} // ✅ Função passada
          />
        )}
        <TransactionList
          transactions={transactions}
          activeTab={activeTab}
          categorias={lookups.categorias} // Adicione esta linha
          onRefresh={refetch}
        />
      </div>
    </Fragment>
  );
};

export default TransactionsPage;