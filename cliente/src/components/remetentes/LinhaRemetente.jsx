import React from 'react'; // Importa a biblioteca React para criar o componente

// Define o componente LinhaRemetente, que recebe um objeto "remetente" e funções como propriedades (props)
const LinhaRemetente = ({ remetente, onEdit, onDelete, formatarDocumento }) => {
    
  return (
    <tr> {/* Define uma linha da tabela para exibir os dados do remetente */}

      <td>{remetente.remetente_id}</td> {/* Exibe o ID do remetente */}

      <td>{remetente.remetente_nome}</td> {/* Exibe o nome do remetente */}

      <td>{formatarDocumento(remetente.remetente_cpf_cnpj)}</td> {/* Formata e exibe o CPF/CNPJ do remetente */}

      <td>{remetente.remetente_endereco}</td> {/* Exibe o endereço do remetente */}

      <td>
        {remetente.remetente_telefone?.replace(
          /(\d{2})(\d{4,5})(\d{4})/, // Expressão regular para formatar o telefone
          '($1) $2-$3' // Formato: (XX) XXXXX-XXXX
        )}
      </td> {/* Exibe o telefone formatado, se existir */}

      {/* Cria uma célula com botões de ação */}
      <td>
        <button 
          onClick={() => onEdit(remetente)} // Chama a função de edição ao clicar
          className="edit-btn" // Classe CSS para estilização
        >
          Editar {/* Texto do botão */}
        </button>
        <button 
          onClick={() => onDelete(remetente.remetente_id)} // Chama a função de exclusão ao clicar
          className="delete-btn" // Classe CSS para estilização
        >
          Excluir {/* Texto do botão */}
        </button>
      </td>
    </tr>
  );
};

export default LinhaRemetente; // Exporta o componente para ser utilizado em outros arquivos
