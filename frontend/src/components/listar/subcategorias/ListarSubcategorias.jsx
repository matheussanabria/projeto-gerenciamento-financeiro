import React, { useEffect, useState } from "react";
import axios from "axios";
import LinhaSubcategoria from "./LinhaSubcategoria"; // Próximo componente que criaremos

const ListarSubcategorias = ({ categoria, subcategoria }) => {
     const [modalAberto, setModalAberto] = useState(false);
    
    const handleAbrirModal = () => setModalAberto(true);
    const handleFecharModal = () => setModalAberto(false);
    
    const [subcategorias, setSubcategorias] = useState([]);

    useEffect(() => {
        if (categoria) {
            axios.get(`http://localhost:5001/subcategorias?categoria_id=${categoria.categoria_id}`)
                .then(res => setSubcategorias(res.data));
        }
    }, [categoria]);
    console.log("Buscando classes para categoria_id:", categoria.categoria_id);

    const handleCreateSubcategoria = () => {
        setIsCreating(true); // Ativa o modal de criação de classe
    };

    const handleNovaSubcategoriaCriada = (novaSubcategoria) => {
        setSubcategorias([...subcategoria, novaSubcategoria]); // Adiciona a nova classe ao final da lista
    };

    const handleEditSubcategoria = (classe) => {
        setEditingSubcategoria(classe); // Ativa o modal de edição com a classe selecionada
    };


    return (
        <div className="tabela-container">
            <h2>Subcategorias de {categoria?.categoria_nome}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Classes</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {subcategorias.map(sub => (
                        <LinhaSubcategoria key={sub.subcategoria_id} subcategoria={sub} />
                    ))}
                </tbody>
            </table>
            <button className="btn adicionar" onClick={handleCreateSubcategoria}>Adicionar Subcategoria</button>


            <style jsx>{`
                .tabela-container {
                    margin-top: 20px;
                    padding: 15px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 600px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    text-align: left;
                }
                th {
                    background: #007bff;
                    color: white;
                }
                    .btn.visualizar { background: #17a2b8; color: white; }
                .btn.editar { background: #ffc107; color: black; }
                .btn.excluir { background: #dc3545; color: white; }
                .btn.adicionar { background: #28a745; color: white;}
            `}</style>
        </div>
    );
};

export default ListarSubcategorias;
