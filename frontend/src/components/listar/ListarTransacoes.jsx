import React, { useEffect, useState, Fragment} from "react";
import axios from "axios";
import LinhaSubcategoria from "./LinhaSubcategoria";

const ListarTransacoes = ({ transacoes }) => {
    const [transacoes, setTransacoes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/transacoes')
        .then(res => set)
    })
}

export default ListarTransacoes;