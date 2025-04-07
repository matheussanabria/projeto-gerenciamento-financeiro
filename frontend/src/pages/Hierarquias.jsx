import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalClasses from "../components/listar/classes/ModalClasses";

const Hierarquias = () => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [subcategoriaAtiva, setSubcategoriaAtiva] = useState(null); // Estado para armazenar a subcategoria ativa
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [isCreating, setIsCreating] = useState(false);  // Estado para controle do modal de criação
  const [editingSubcat, setEditingSubcat] = useState(null);  // Estado para controle do modal de edição
  

  useEffect(() => {
    axios.get("http://localhost:5001/categorias")
      .then(res => {
        setCategorias(res.data);
        if (res.data.length > 0) {
          setCategoriaAtiva(res.data[0]); 
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar categorias");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5001/subcategorias")
      .then(res => setSubcategorias(res.data))
      .catch(() => setError("Erro ao carregar subcategorias"));
  }, []);

  const subcategoriasFiltradas = subcategorias.filter(
    sub => sub.categoria_id === categoriaAtiva?.categoria_id
  );

  const handleDelete = async (subcategoriaId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta classe?")) return;

    try {
        await axios.delete(`http://localhost:5001/subcategoria/${subcategoriaId}`);
        setSubcategorias(subcategorias.filter((sub) => sub.subcategoria_id !== subcategoriaId)); // Remove a classe da lista
    } catch (error) {
        setError("Erro ao excluir classe.");
    }
};
  const handleSelecionarSubcategoria = (subcategoria) => {
    setSubcategoriaAtiva(subcategoria); // Define a subcategoria ativa
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setSubcategoriaAtiva(null);
  };

  const handleCreateSubcat = () => {
    setIsCreating(true); // Ativa o modal de criação de classe
};

const handleNovaSubcatCriada = (novaSubcat) => {
    setSubcategorias([...subcategorias, novaSubcat]); // Adiciona a nova classe ao final da lista
};

  const handleEditSubcat = (subcategoria) => {
    setEditingSubcat(subcategoria); // Ativa o modal de edição com a classe selecionada
};

    // Adicione esta função para atualizar a lista de classes após edição
    const handleSubcatEditada = (subcatEditada) => {
      setSubcategorias(subcategorias.map(sub => 
          sub.subcategoria_id === subcatEditada.subcategoria_id ? subcatEditada : sub
      ));
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Hierarquias</h1>

      <div className="tabs">
        {categorias.map(cat => (
          <button
            key={cat.categoria_id}
            className={cat.categoria_id === categoriaAtiva?.categoria_id ? "tab active" : "tab"}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat.categoria_nome}
          </button>
        ))}
      </div>

      {categoriaAtiva && (
        <div className="tabela-container">
          <h2>Subcategorias de {categoriaAtiva.categoria_nome}</h2>
          <table>
            <thead>
              <tr>
                <th>Subcategoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {subcategoriasFiltradas.map(sub => (
                <tr key={sub.subcategoria_id}>
                  <td>{sub.subcategoria_nome}</td>
                  <td>
                    <button className="btn visualizar" onClick={() => handleSelecionarSubcategoria(sub)}>
                        Ver Classes
                    </button>
                    <button className="btn editar" onClick={() => handleEditSubcat(sub)}>Editar</button>
                    <button className="btn excluir" onClick={() => handleDelete(sub.subcategoria_id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAberto && subcategoriaAtiva && (
        <ModalClasses subcategoria={subcategoriaAtiva} onClose={handleFecharModal} />
      )}

        {/* Renderiza o modal de criação ou edição, dependendo do estado */}
        {/* {isCreating && 
            <ModalAdicionarSubcat 
                categoria={categoriaAtiva} 
                onClose={() => setIsCreating(false)} 
                onSubcatAdicionada={handleNovaSubcatCriada}
            />}
        {editingSubcat && 
            <ModalEditarSubcat 
                classe={editingSubcat} 
                onClose={() => setEditingSubcat(null)}
                onSubcatEditada={handleSubcatEditada} // 👈 Adicione esta linha
            />
        } */}

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: auto;
        }
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tab {
          padding: 10px 15px;
          cursor: pointer;
          background: #f0f0f0;
          border: none;
          border-radius: 5px;
        }
        .tab.active {
          background: #007bff;
          color: white;
        }
        .tabela-container {
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
        .btn {
          padding: 5px 10px;
          border: none;
          cursor: pointer;
          background: #17a2b8;
          color: white;
          border-radius: 5px;
        }
        .btn.active {
          background: #007bff;
        }
        .loading, .error {
          font-size: 18px;
          text-align: center;
          color: #ff0000;
        }
        .loading {
          font-weight: bold;
        }
        .error {
          color: #d9534f;
        }
      `}</style>
    </div>
  );
};

export default Hierarquias;
