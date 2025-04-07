import React, { useState } from "react";
import ModalClasses from "../classes/ModalClasses"; // Próximo componente que criaremos

const LinhaSubcategoria = ({ subcategoria }) => {
    const [modalAberto, setModalAberto] = useState(false);

    const handleAbrirModal = () => setModalAberto(true);
    const handleFecharModal = () => setModalAberto(false);

    const handleEditar = () => {
        console.log(`Editar subcategoria: ${subcategoria.subcategoria_nome}`);
    };

    const handleExcluir = () => {
        const confirmar = window.confirm(`Deseja excluir a subcategoria "${subcategoria.subcategoria_nome}"?`);
        if (confirmar) {
            console.log(`Subcategoria ${subcategoria.subcategoria_nome} excluída.`);
        }
    };

    return (
        <>
            <tr>
                <td>{subcategoria.subcategoria_nome}</td>
                <td>
                    <button className="btn visualizar" onClick={handleAbrirModal}>
                        Ver Classes
                    </button>
                </td>
                <td>
                    <button className="btn editar" onClick={handleEditar}>✏️</button>
                    <button className="btn excluir" onClick={handleExcluir}>🗑️</button>
                </td>
            </tr>

            {modalAberto && <ModalClasses subcategoria={subcategoria} onClose={handleFecharModal} />}

            <style jsx>{`

            thead{
                background-color: #8080804f;
            }
            tr:hover{
                background-color: #8080804f;
            }
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
                .editar {
                    background: #ffc107;
                    color: black;
                }
                .excluir {
                    background: #dc3545;
                    color: white;
                }
                    
            `}</style>
        </>
    );
};

export default LinhaSubcategoria;
