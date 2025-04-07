import React, { useState } from "react";
import ModalSubclasses from "../listar/ModalSubclasses"; // Próximo componente que criaremos

const LinhaSubclasse = ({ subclasse }) => {


    const handleEditar = () => {
        console.log(`Editar subclase: ${subcategoria.subcategoria_nome}`);
    };
    const handleExcluir = () => {
        const confirmar = window.confirm(`Deseja excluir a subclasse "${subclasse.subclasse_nome}"?`);
        if (confirmar) {
            console.log(`Classe ${subclasse.subclasse_nome} excluída.`);
        }
    };

    return (
        <>
            <tr>
                <td>{subclasse.subclasse_nome}</td>
                <td>
                    <button className="btn editar" onClick={handleEditar}>✏️</button>
                    <button className="btn excluir" onClick={handleExcluir}>🗑️</button>
                </td>
            </tr>

            {modalAberto && <ModalSubclasses subclasse={subclasse} onClose={handleFecharModal} />}

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

export default LinhaSubclasse;
