// pages/transacoes.jsx
// No topo do arquivo transacoes.jsx
import { LoadingSpinner } from '../components/Loading/LoadingSpinner';
import { ErrorDisplay } from '../components/Error/ErrorDisplay';
import Header from '../components/Header/Header'
import { useState, useEffect, React, Fragment } from 'react'
import { useTransactions } from '../features/transactions//hooks/useTransactions'
// Importação correta
import { TransactionTabs } from '../features/transactions/components/TransactionTabs';
import { TransactionList } from '../features/transactions/components/TransactionList';
import { TransactionForm } from '../features/transactions/components/TransactionForm';

const TransactionsPage = () => {
  const { transactions, lookups, loading, error, refetch } = useTransactions();
  // Garanta que lookups.categorias seja um array
  console.log('Estrutura do lookups:', lookups);
  const [activeTab, setActiveTab] = useState('Gastos');
  const [showForm, setShowForm] = useState(false);
  // const [categorias, setCategorias] = useState([])
  // No componente pai (Transacoes.jsx ou similar):

// Efeito para carregar categorias
// useEffect(() => {
//   const carregarCategorias = async () => {
//     try {
//       const resposta = await fetch('http://localhost:5001/categorias');
//       const dados = await resposta.json();
//       setCategorias(dados);
//     } catch (error) {
//       console.error('Erro ao carregar categorias:', error);
//     }
//   };
//   carregarCategorias();
// }, []);

// No componente pai (TransactionsPage), antes de passar para TransactionTabs
console.log('Categorias:', lookups.categorias); // Deve mostrar um array

  const handleSubmitSuccess = () => {
    setShowForm(false);
    refetch();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Fragment>
      <Header></Header>
      <div className="componenteListar">
      // TransactionsPage.jsx
    <TransactionTabs
      categorias={Array.isArray(lookups.categorias) ? lookups.categorias : []} // Defesa dupla
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showForm={showForm}
      onToggleForm={() => setShowForm(!showForm)}
    />
        
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Adicionar Novo Dado'}
        </button>

        <TransactionForm
          show={showForm}
          onHide={() => setShowForm(false)}
          lookups={lookups}
          onSubmitSuccess={handleSubmitSuccess}
        />

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