// transactionAPI.js
const API_URL = 'http://localhost:5001';

export const TransactionAPI = {
  getAll: () => fetch(`${API_URL}/transacoes`),
  delete: (id) => fetch(`${API_URL}/transacoes/${id}`, { method: 'DELETE' }),
  create: (data) => fetch(`${API_URL}/transacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
};
export const LookupAPI = {
  async getAll() {
    const endpoints = [
      'remetentes',
      'metodos-pagamento',
      'formas-parcelamento',
      'contas',
      'categorias',
      'subcategorias',
      'classes',
      'subclasses'
    ];

    // Busca e processa TODOS os dados de lookup
    const responses = await Promise.all(
      endpoints.map(endpoint => 
        fetch(`http://localhost:5001/${endpoint}`)
          .then(res => res.json()) // Converta diretamente para JSON aqui
      )
    );

    // Mapeia para um objeto com as chaves corretas
    return {
      remetentes: responses[0],
      metodosPagamento: responses[1],
      formasParcelamento: responses[2],
      contas: responses[3],
      categorias: responses[4],
      subcategorias: responses[5],
      classes: responses[6],
      subclasses: responses[7]
    };
  }
};