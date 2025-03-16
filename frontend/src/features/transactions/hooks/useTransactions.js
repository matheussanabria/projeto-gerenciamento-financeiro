import { useState, useEffect } from 'react';
import { TransactionAPI, LookupAPI } from '../api/transactionAPI';

  export const useTransactions = () => {
    const [state, setState] = useState({
      transactions: [],
      lookups: {
        remetentes: [],
        metodosPagamento: [],
        formasParcelamento: [],
        contas: [],
        categorias: [],
        subcategorias: [],
        classes: [],
        subclasses: []
      },
      loading: true,
      error: null,
    });

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        const [transactionsRes, lookupData] = await Promise.all([
          TransactionAPI.getAll(),
          LookupAPI.getAll(), // Já retorna dados processados
        ]);
  
        if (!transactionsRes.ok) throw new Error('Erro ao carregar transações');
  
        // Dados já formatados corretamente
        const processedLookups = {
          remetentes: lookupData.remetentes,
          metodosPagamento: lookupData.metodosPagamento,
          formasParcelamento: lookupData.formasParcelamento,
          contas: lookupData.contas,
          categorias: lookupData.categorias, // Array direto
          subcategorias: lookupData.subcategorias,
          classes: lookupData.classes,
          subclasses: lookupData.subclasses
        };
  
        const transactions = await transactionsRes.json();
        
        setState({
          transactions,
          lookups: processedLookups,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          transactions: [],
          lookups: {},
          loading: false,
          error: error.message,
        });
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      await TransactionAPI.delete(id);
      setState(prev => ({
        ...prev,
        transactions: prev.transactions.filter(t => t.transacao_id !== id),
      }));
    } catch (error) {
      console.error('Erro ao deletar:', error);
      throw error;
    }
  };

  return {
    ...state,
    refetch: fetchData,
    deleteTransaction,
  };
};