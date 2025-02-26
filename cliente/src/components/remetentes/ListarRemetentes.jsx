// Importa a biblioteca React para criar o componente
import React from 'react';

// Importa o componente LinhaRemetente, que representa cada linha da tabela
import LinhaRemetente from './LinhaRemetente';

// Define o componente ListarRemetentes, que recebe uma lista de remetentes e funções como propriedades (props)
const ListarRemetentes = ({ remetentes, onEdit, onDelete, formatarDocumento }) => {
    
  return (
    <>
      <table className="remetentes-table"> {/* Cria a tabela onde os remetentes serão listados */}
        <thead> {/* Cabeçalho da tabela */}
          <tr> {/* Linha do cabeçalho */}
            <th>ID</th> {/* Coluna para o ID */}
            <th>Nome</th> {/* Coluna para o Nome */}
            <th>CPF/CNPJ</th> {/* Coluna para o CPF/CNPJ */}
            <th>Endereço</th> {/* Coluna para o Endereço */}
            <th>Telefone</th> {/* Coluna para o Telefone */}
            <th>Ações</th> {/* Coluna para os botões de ação (editar/excluir) */}
          </tr>
        </thead>
        <tbody> {/* Corpo da tabela onde os dados dos remetentes serão exibidos */}
          {remetentes.map((remetente) => ( // Percorre a lista de remetentes e cria uma linha para cada um
            <LinhaRemetente
              key={remetente.remetente_id} // Define uma chave única para cada linha (importante no React)
              remetente={remetente} // Passa os dados do remetente para o componente LinhaRemetente
              onEdit={onEdit} // Passa a função de edição
              onDelete={onDelete} // Passa a função de exclusão
              formatarDocumento={formatarDocumento} // Passa a função para formatar CPF/CNPJ
            />
          ))}
        </tbody>
      </table>

      {/* Estilos CSS aplicados diretamente ao componente */}
      <style jsx>{`
        /* Contêiner principal da tabela, permitindo rolagem horizontal */
        .table-container {
          overflow-x: auto;
          margin: 10px;
        }

        /* Contêiner da tabela */
        .container {
          padding: 20px;
        }
        

        /* Estilo do botão de adicionar novo remetente */
        .new-button {
          width: 20%;
          background-color: #2196F3;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        /* Efeito de hover para o botão */
        .new-button:hover {
          background-color: #1976D2;
          transform: translateY(-1px);
        }
        
        /* Estilos para telas menores (responsividade) */
        @media (max-width: 768px) {
          .header-actions {
            flex-direction: column;
          }
          
          .new-button {
            width: 100%;
          }
        }
        
        /* Estilo da tabela */
        .remetentes-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        
        /* Estilos para o cabeçalho da tabela */
        .remetentes-table th {
          background-color: #f5f6fa;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #dcdde1;
        }
        
        /* Estilos para as células da tabela */
        .remetentes-table td {
          padding: 12px;
          border-bottom: 1px solid #dcdde1;
        }
        
        /* Efeito ao passar o mouse sobre uma linha da tabela */
        .remetentes-table tr:hover {
          background-color: #f8f9fa;
        }
        
        /* Estilo para mensagens de carregamento */
        .loading {
          padding: 20px;
          text-align: center;
          color: #7f8fa6;
        }

        /* Ajustes para telas menores */
        @media (max-width: 768px) {
          .table-container {
            margin: 10px;
          }
          
          .remetentes-table td, 
          .remetentes-table th {
            padding: 8px;
            font-size: 14px;
          }
        }

        
        /* Estilo do botão de editar */
        .edit-btn {
          width: 75px;
          background-color: #4CAF50;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          margin-right: 5px;
          cursor: pointer;
        }

        /* Estilo do botão de excluir */
        .delete-btn {
          width: 75px;
          background-color: #f44336;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Efeito de hover para os botões de ação */
        .edit-btn:hover, .delete-btn:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default ListarRemetentes; // Exporta o componente para ser utilizado em outros arquivos
