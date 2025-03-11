import React, { useEffect, useState } from "react";
import axios from "axios";
import LinhaSubcategoria from "./LinhaSubcategoria"; // Próximo componente que criaremos

const ListarSubcategorias = ({ categoria }) => {
    const [subcategorias, setSubcategorias] = useState([]);

    useEffect(() => {
        if (categoria) {
            axios.get(`http://localhost:5001/subcategorias?categoria_id=${categoria.categoria_id}`)
                .then(res => setSubcategorias(res.data));
        }
    }, [categoria]);
    console.log("Buscando classes para categoria_id:", categoria.categoria_id);


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
            `}</style>
        </div>
    );
};

export default ListarSubcategorias;
