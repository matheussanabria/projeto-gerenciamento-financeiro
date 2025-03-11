import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalAdicionarSubclasse from "../inserir/ModalAdicionarSublasse";  // Importe o ModalAdicionarSub
import ModalEditarSubclasse from "../editar/ModalEditarSubclasse";  // Importe o ModalEditarClasse

const ModalSubclasses = ({ classe, onClose }) => {
    const [subclasses, setSubclasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);  // Estado para controle do modal de criação
    const [editingSubclasse, setEditingSubclass] = useState(null);  // Estado para controle do modal de edição

    useEffect(() => {
        if (classe) {
            setLoading(true);
            axios.get(`http://localhost:5001/subclasses?classe_id=${classe.classe_id}`)
                .then(res => {
                    setSubclasses(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Erro ao carregar subclasses");
                    setLoading(false);
                });
        }
    }, [classe]);
    console.log("Buscando subclasses para classe_id:", classe.classe_id);

    const handleDelete = async (subclasseId) => {
        if (!window.confirm("Tem certeza que deseja excluir esta classe?")) return;

        try {
            await axios.delete(`http://localhost:5001/subclasses/${subclasseId}`);
            setSubclasses(subclasses.filter((scl) => scl.subclasse_id !== subclasseId)); // Remove a classe da lista
        } catch (error) {
            setError("Erro ao excluir classe.");
        }
    };

    const handleCreateSubclass = () => {
        setIsCreating(true); // Ativa o modal de criação de classe
    };

    const handleNovaSubclasseCriada = (novaSubclasse) => {
        setSubclasses([...subclasses, novaSubclasse]); // Adiciona a nova classe ao final da lista
    };

    const handleEditsubClass = (subclasse) => {
        setEditingSubclass(subclasse); // Ativa o modal de edição com a classe selecionada
    };

    if (loading) return <div className="loading">Carregando subclasses...</div>;
    if (error) return <div className="error">{error}</div>;

    // Adicione esta função para atualizar a lista de subclasses após edição
    const handleSubclasseEditada = (subclasseEditada) => {
        setSubclasses(subclasses.map(scl => 
            scl.subclasse_id === subclasseEditada.subclasse_id ? subclasseEditada : scl
        ));
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>subClasses de {classe.classe_nome}</h2>
                <div className="listar-subclasses">

                    {subclasses.length === 0 ? (
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
                                {subclasses.map(scl => (
                                    <tr key={scl.subclasse_id}>
                                        <td>{scl.subclasse_nome}</td>
                                        <td>{scl.subclasse_descricao}</td>
                                        <td>
                                            <button className="btn editar" onClick={() => handleEditsubClass(scl)}>Editar</button>
                                            <button className="btn excluir" onClick={() => handleDelete(scl.subclasse_id)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                    <div className="modal-footer">
                        <button className="btn adicionar" onClick={handleCreateSubclass}>Adicionar Classe</button>
                        <button className="btn fechar" onClick={onClose}>Fechar</button>
                        <button className="btn fechar-X" onClick={onClose}>X</button>

                    </div>


                {/* Renderiza o modal de criação ou edição, dependendo do estado */}
                {/* Corrija o nome da prop no ModalAdicionarSubclasse */}
                {isCreating && 
                    <ModalAdicionarSubclasse 
                        classe={classe} 
                        onClose={() => setIsCreating(false)} 
                        onSubclasseAdicionada={handleNovaSubclasseCriada} //👈 Nome corrigido
                    />
                }
                {editingSubclasse && 
                    <ModalEditarSubclasse 
                        subclasse={editingSubclasse} 
                        onClose={() => setEditingSubclass(null)}
                        onSubclasseEditada={handleSubclasseEditada} // 👈 Adicione esta linha
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
                
                .listar-subclasses{
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

export default ModalSubclasses;
