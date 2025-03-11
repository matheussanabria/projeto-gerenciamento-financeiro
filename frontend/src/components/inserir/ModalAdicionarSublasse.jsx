import React, { useState } from "react";
import axios from "axios";

const ModalAdicionarClasse = ({ subcategoria, onClose, onClasseAdicionada }) => {
    const [classeNome, setClasseNome] = useState("");
    const [classeDescricao, setClasseDescricao] = useState("");
    const [erro, setErro] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(null);

        try {
            const response = await axios.post('http://localhost:5001/classes', {
                classe_nome: classeNome,
                classe_descricao: classeDescricao,
                subcategoria_id: subcategoria.subcategoria_id,  // Envie "subcategoria_id" sem o prefixo "classe_"
                classe_status: true // Adicione se necessário
            });
    
            console.log('Classe criada com sucesso:', response.data);
            onClasseAdicionada(response.data); // Atualiza a lista de classes no componente pai
            onClose(); // Fecha o modal
        }  catch (error) {
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
                <h2>Adicionar Classe</h2>
                {erro && <p className="error">{erro}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome da Classe"
                        value={classeNome}
                        onChange={(e) => setClasseNome(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descrição"
                        value={classeDescricao}
                        onChange={(e) => setClasseDescricao(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="btn adicionar">Adicionar</button>
                    <button className="btn fechar" onClick={onClose}>Fechar</button>
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
                .table{
                    
                }

                .btn {
                    margin: 5px;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .btn.adicionar { background: #28a745; color: white; }
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

export default ModalAdicionarClasse;
