import React, { useState } from "react";
import axios from "axios";

const ModalEditarSubclasse = ({ subclasse, onClose, onSubclasseEditada }) => {
    const [subclasseNome, setSubclasseNome] = useState(subclasse.subclasse_nome);
    // Alterar estado (linha 5 do front)
    const [subclasseDescricao, setSubclasseDescricao] = useState(subclasse.subclasse_descricao);
    const [erro, setErro] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(null);
    
        try {
            const response = await axios.put(
                `http://localhost:5001/subclasses/${subclasse.subclasse_id}`,
                {
                    subclasse_nome: subclasseNome,
                    subclasse_descricao: subclasseDescricao,
                    subclasse_status: subclasse.subclasse_status || true, // Campo obrigatório
                    classe_id: subclasse.classe_id // Campo obrigatório
                }
            );
    
            // Use os dados retornados pelo back-end para garantir consistência
            onSubclasseEditada(response.data); 
            onClose();
        }// Front-end (ModalEditarSubclasse.jsx)
        catch (error) {
            console.error("Erro detalhado:", error.response?.data || error.message);
            
            // Extrai a mensagem de erro corretamente
            const errorMessage = 
                error.response?.data?.message || // Para erros do Joi/PostgreSQL
                error.response?.data?.error ||   // Para erros personalizados (ex: 404)
                error.message ||                 // Erros de rede
                "Erro ao editar classe.";
                
            setErro(errorMessage); // 👈 Garante que é uma string
            onClose(); // Opcional: fecha o modal após erro
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Subclasse</h2>
                {erro && <p className="error">{erro}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={subclasseNome}
                        onChange={(e) => setSubclasseNome(e.target.value)}
                        required
                    />
                    <textarea
                        value={subclasseDescricao}
                        onChange={(e) => setSubclasseDescricao(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="btn editar">Salvar</button>
                    <button className="btn fechar" onClick={onClose}>Cancelar</button>
                    <button className="btn fechar-X" onClick={onClose}>X</button>

                </form>
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
                .btn {
                    margin: 5px;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .btn.editar { background: #ffc107; color: black; }
                .btn.fechar { background: #007bff; color: white; }
                .btn.fechar-X { background: #007bff; color: white; margin: 5px; position: absolute; right: 0; top: 0; }

                .error { color: red; }
                input, textarea {
                    width: 100%;
                    padding: 8px;
                    margin: 10px 0;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default ModalEditarSubclasse;
