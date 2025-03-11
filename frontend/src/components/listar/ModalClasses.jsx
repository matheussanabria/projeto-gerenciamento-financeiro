import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalSubclasses from "./ModalSubclasses"; // Próximo componente que criaremos
import ModalAdicionarClasse from "../inserir/ModalAdicionarClasse";  // Importe o ModalAdicionarClasse
import ModalEditarClasse from "../editar/ModalEditarClasse";  // Importe o ModalEditarClasse

const ModalClasses = ({ subcategoria, classe, onClose }) => {
    const [modalAberto, setModalAberto] = useState(false);

    const handleAbrirModal = () => setModalAberto(true);
    const handleFecharModal = () => setModalAberto(false);
    
    const [classes, setClasses] = useState([]);
    const [classeSelecionada, setClasseSelecionada] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isCreating, setIsCreating] = useState(false);  // Estado para controle do modal de criação
    const [editingClasse, setEditingClasse] = useState(null);  // Estado para controle do modal de edição

    useEffect(() => {
        if (subcategoria) {
            setLoading(true);
            axios.get(`http://localhost:5001/classes?subcategoria_id=${subcategoria.subcategoria_id}`)
                .then(res => {
                    setClasses(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Erro ao carregar classes");
                    setLoading(false);
                });
        }
    }, [subcategoria]);
    console.log("Buscando classes para subcategoria_id:", subcategoria.subcategoria_id);

    const handleDelete = async (classeId) => {
        if (!window.confirm("Tem certeza que deseja excluir esta classe?")) return;

        try {
            await axios.delete(`http://localhost:5001/classes/${classeId}`);
            setClasses(classes.filter((cl) => cl.classe_id !== classeId)); // Remove a classe da lista
        } catch (error) {
            setError("Erro ao excluir classe.");
        }
    };

    const handleCreateClass = () => {
        setIsCreating(true); // Ativa o modal de criação de classe
    };

    const handleNovaClasseCriada = (novaClasse) => {
        setClasses([...classes, novaClasse]); // Adiciona a nova classe ao final da lista
    };

    const handleEditClass = (classe) => {
        setEditingClasse(classe); // Ativa o modal de edição com a classe selecionada
    };

    if (loading) return <div className="loading">Carregando classes...</div>;
    if (error) return <div className="error">{error}</div>;

    // Adicione esta função para atualizar a lista de classes após edição
    const handleClasseEditada = (classeEditada) => {
        setClasses(classes.map(cl => 
            cl.classe_id === classeEditada.classe_id ? classeEditada : cl
        ));
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Classes de {subcategoria.subcategoria_nome}</h2>
                <div className="listar-classes">

                    {classes.length === 0 ? (
                        <p>Nenhuma classe encontrada.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map(cl => (
                                    <tr key={cl.classe_id}>
                                        <td>{cl.classe_nome}</td>
                                        <td>{cl.classe_descricao}</td>
                                        <td>
                                            <button 
                                                className="btn visualizar" 
                                                onClick={() => {
                                                    handleAbrirModal(cl);
                                                    setClasseSelecionada(cl); 
                                                }} >
                                                    Ver Subclasses
                                            </button>                                            
                                            <button className="btn editar" onClick={() => handleEditClass(cl)}>Editar</button>
                                            <button className="btn excluir" onClick={() => handleDelete(cl.classe_id)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                    <div className="modal-footer">
                        <button className="btn adicionar" onClick={handleCreateClass}>Adicionar Classe</button>
                        <button className="btn fechar" onClick={onClose}>Fechar</button>
                        <button className="btn fechar-X" onClick={onClose}>X</button>

                    </div>
                    {modalAberto && 
                        <ModalSubclasses 
                            classe={classeSelecionada} // 👈 Agora é um objeto válido
                            onClose={handleFecharModal} 
                        /> 
                    }            

                {/* Renderiza o modal de criação ou edição, dependendo do estado */}
                {isCreating && 
                    <ModalAdicionarClasse 
                        subcategoria={subcategoria} 
                        onClose={() => setIsCreating(false)} 
                        onClasseAdicionada={handleNovaClasseCriada}
                    />}
                {editingClasse && 
                    <ModalEditarClasse 
                        classe={editingClasse} 
                        onClose={() => setEditingClasse(null)}
                        onClasseEditada={handleClasseEditada} // 👈 Adicione esta linha
                    />
                }
            </div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 500px;
                    text-align: center;
                }
                
                .listar-classes{
                    max-height: 600px;
                    overflow-y: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }

                .modal-footer {
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                    gap: 20px;
                    justify-content: center;
                }
                .btn {
                    padding: 5px 10px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .btn.visualizar { background: #17a2b8; color: white; }
                .btn.editar { background: #ffc107; color: black; }
                .btn.excluir { background: #dc3545; color: white; }
                .btn.adicionar { background: #28a745; color: white;}
                .btn.fechar { background: #007bff; color: white;}
                .btn.fechar-X { background: #007bff; color: white; margin: 5px; position: absolute; right: 0; top: 0; }

            `}</style>
        </div>
    );
};

export default ModalClasses;
