import React, { useState } from "react";
import ModalSubclasses from "./ModalSubclasses"; // Próximo componente que criaremos

const LinhaClasse = ({ classe }) => {
    const [modalAberto, setModalAberto] = useState(false);

    const handleAbrirModal = () => setModalAberto(true);
    const handleFecharModal = () => setModalAberto(false);

    const handleExcluir = () => {
        const confirmar = window.confirm(`Deseja excluir a classe "${classe.classe_nome}"?`);
        if (confirmar) {
            console.log(`Classe ${classe.classe_nome} excluída.`);
        }
    };

    return (
        <>
            <tr>
                <td>{classe.classe_nome}</td>
                <td>
                    <button className="btn visualizar" onClick={handleAbrirModal}>
                        Ver Subclasses
                    </button>
                </td>
                <td>
                    <button className="btn excluir" onClick={handleExcluir}>🗑️</button>
                </td>
            </tr>

            {modalAberto && <ModalSubclasses classe={classe} onClose={handleFecharModal} />}

            <style jsx>{`
                .btn {
                    padding: 5px 10px;
                    margin: 2px;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    border-radius: 5px;
                }
                .visualizar {
                    background: #17a2b8;
                    color: white;
                }
                .excluir {
                    background: #dc3545;
                    color: white;
                }
            `}</style>
        </>
    );
};

export default LinhaClasse;
