import React, { useEffect, useState } from "react";
import axios from "axios";

const ListarCategorias = ({ onCategoriaSelecionada }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5001/categorias").then(res => setCategorias(res.data));
    }, []);

    const handleSelecionarCategoria = (categoria) => {
        setCategoriaSelecionada(categoria.categoria_id);
        onCategoriaSelecionada(categoria);
    };

    return (
        <div className="abas">
            {categorias.map(cat => (
                <button 
                    key={cat.categoria_id} 
                    className={`aba ${categoriaSelecionada === cat.categoria_id ? 'ativa' : ''}`} 
                    onClick={() => handleSelecionarCategoria(cat)}
                >
                    {cat.categoria_nome}
                </button>
            ))}
            <div className="actions">
                <button>Editar</button>
                <button>Adicionar</button>

            </div>

            <style jsx>{`
                .abas {
                    display: flex;
                    gap: 10px;
                }
                .aba {
                    padding: 10px;
                    border: none;
                    background: #ddd;
                    cursor: pointer;
                }
                .aba.ativa {
                    background: #007bff;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default ListarCategorias;
