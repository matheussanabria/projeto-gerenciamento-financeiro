// Importação correta com desestruturação
import React, { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
// Componentes de UI para funcionalidades CRUD
import ListarRemetentes from '../components/remetentes/ListarRemetentes';
import BuscarRemetente from '../components/remetentes/BuscaRemetente';
import CriarRemetenteModal from '../components/remetentes/CriarRemetenteModal';
import EditarRemetenteModal from '../components/remetentes/EditarRemetenteModal';

import Toast from '../components/Toast';

const Remetentes = () => {
  // Estados para gerenciamento de dados e UI
  const [remetentes, setRemetentes] = useState([]); // Lista completa de remetentes
  const [remetenteEditando, setRemetenteEditando] = useState(null);
  const [filtro, setFiltro] = useState(''); // Filtro atual para busca
  const [filteredRemetentes, setFilteredRemetentes] = useState([]); // Lista filtrada
  const [searchQuery, setSearchQuery] = useState(''); // Query de busca
  const [showCreateModal, setShowCreateModal] = useState(false); // Controle do modal de criação
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [selectedRemetente, setSelectedRemetente] = useState(null); // Remetente selecionado para edição
  const [showModal, setShowModal] = useState(false); // Controle do modal de edição
  // const [toastMessage, setToastMessage] = useState(''); // Mensagem do toast
  // const [showToast, setShowToast] = useState(false); // Visibilidade do toast

  // Efeito para carregar dados iniciais e aplicar filtros
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/remetentes');
        const data = await response.json();
        setRemetentes(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };
    fetchData();

    // Aplica filtro sempre que searchQuery ou remetentes mudarem
    const results = remetentes.filter(remetente =>
    Object.values(remetente).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  ));
    setFilteredRemetentes(results);
  }, [searchQuery, remetentes]);

  // Filtra remetentes por nome ou documento
  const remetentesFiltrados = remetentes.filter(remetente =>
    remetente.remetente_nome.toLowerCase().includes(filtro.toLowerCase()) ||
    remetente.remetente_cpf_cnpj.includes(filtro) ||
    remetente.remetente_endereco.includes(filtro) ||
    remetente.remetente_telefone.includes(filtro)
  );

 // Handlers para ações CRUD
 const handleEdit = (remetente) => {
  setSelectedRemetente(remetente);
  setShowModal(true);
};

const handleCreate = () => {
  fetch('http://localhost:5001/remetentes')
    .then(res => res.json())
    .then(data => {
      setRemetentes(data);
      // setToastMessage('Remetente criado com sucesso!');
      // setShowToast(true);
    })
    .catch(console.error);
};

const handleUpdate = async (remetente) => {
  setSelectedRemetente(remetente);
  setShowModal(true);
  try {
    const response = await fetch('http://localhost:5001/remetentes');
    
    if (!response.ok) {
      throw new Error('Erro ao buscar remetentes');
    }

    const data = await response.json();
    setRemetentes(data);
    // setToastMessage('Remetente atualizado com sucesso!');
    // setShowToast(true);
  } catch (error) {
    console.error('Erro ao atualizar remetentes:', error);
    // setToastMessage('Erro ao atualizar remetentes');
    // setShowToast(true);
  }
};

const handleDelete = async (remetenteId) => {
  try {
    const response = await fetch(`http://localhost:5001/remetentes/${remetenteId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir remetente');
    }

    setRemetentes(prevRemetentes => prevRemetentes.filter(remetente => remetente.remetente_id !== remetenteId));
    // setToastMessage('Remetente excluído com sucesso!');
    // setShowToast(true);
  } catch (error) {
    console.error('Erro ao excluir remetente:', error);
    // setToastMessage('Erro ao excluir remetente');
    // setShowToast(true);
  }
};



// Formata CPF/CNPJ para exibição
const formatarDocumento = (doc) => {
  if (!doc) return '';
  return doc.length === 11 ? 
    doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 
    doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

// Estado de carregamento
if (loading) {
  return <div className="loading">Carregando dados...</div>;
}


  return (
    <>
    <Header></Header>
    <div className="table-container">

    {/* Seção de cabeçalho com busca e botão de novo */}
      
    <div className="header-actions">
      <BuscarRemetente
        filtro={filtro}
        setFiltro={setFiltro}
      />

      {/* Modal de criação de remetente */}

      {showCreateModal && (
        <CriarRemetenteModal 
          onCreate={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      <button 
        className="new-button"
        onClick={() => setShowCreateModal(true)}
      >
        Novo Remetente
      </button>
    </div>

    {/* Sistema de notificação Toast */}
    {/* {showToast && (
      <Toast 
        message={toastMessage}
        type="success"
        onClose={() => setShowToast(false)}
      />
    )} */}

    {/* Modal de edição */}

    {showModal && (
      <EditarRemetenteModal
        remetente={selectedRemetente}
        onClose={() => setShowModal(false)}
        onUpdate={handleUpdate}
      />
    )}
        
    <ListarRemetentes
      remetentes={remetentesFiltrados}
      onEdit={(handleUpdate)}
      onDelete={(handleDelete)}
      formatarDocumento={formatarDocumento}
    />

    {/* {showToast && <Toast message={toastMessage} />} */}
  

      <style jsx>{`
        // ... (mantenha os estilos anteriores e adicione)

         .table-container {
          overflow-x: auto;
          margin: 0 20px 0 20px;
        }
           .container {
          padding: 20px;
        }
        
        /* Cabeçalho da tabela e botão de adicionar novo remetente */
        .header-actions {
          display: flex;
          width: 100%
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .new-button {
        width:20%;
          background-color: #2196F3;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .new-button:hover {
          background-color: #1976D2;
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .header-actions {
            flex-direction: column;
          }
          
          .new-button {
            width: 100%;
          }
        }
        
        .remetentes-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          border-radius: 3px solid;
        }
        
        .remetentes-table th {
          background-color: #f5f6fa;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #dcdde1;
        }
        
        .remetentes-table td {
          padding: 12px;
          border-bottom: 1px solid #dcdde1;
        }
        
        .remetentes-table tr:hover {
          background-color: #f8f9fa;
        }
        
        .loading {
          padding: 20px;
          text-align: center;
          color: #7f8fa6;
        }

        @media (max-width: 768px) {
          .header-actions{
            margin-bottom: 20px;
          }
          .remetentes-table td, 
          .remetentes-table th {
            padding: 8px;
            font-size: 14px;
          }
        }

       
      `}</style>
    </div>

    </>
  );
};

export default Remetentes;