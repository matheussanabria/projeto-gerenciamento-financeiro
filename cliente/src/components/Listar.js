import React, { useState, useEffect, Fragment } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import EditarDados from "./Editar";
import GraficoPizzaGastos from "./graficoGastos";
import GraficoPizzaGanhos from "./graficoGanhos";

const ListarDados = () => {
    const [dados, definirDados] = useState([]);
    const [abas, definirAbas] = useState([]);
    const [abaAtiva, definirAbaAtiva] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [novoDado, setNovoDado] = useState({
        descricao: '',
        valor: '',
        metodo_pagamento_id: '',
        remetente_id: '',
        subcategoria_id: '',
        classe_id: '',
        subclasse_id: '',
        data: ''
    });

    const [metodosPagamento, setMetodosPagamento] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subclasses, setSubclasses] = useState([]);

    const deletarDado = async (id) => {
        try {
          await fetch(`http://localhost:5001/transacoes/${id}`, {
            method: 'DELETE',
          });
          definirDados(dados.filter((dado) => dado.id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    const obterOpcoes = async () => {
        try {
            const metodosResposta = await fetch('http://localhost:5001/metodos-pagamento/');
            const categoriasResposta = await fetch('http://localhost:5001/categorias/');
            const subcategoriasResposta = await fetch('http://localhost:5001/subcategorias/');
            const classesResposta = await fetch('http://localhost:5001/classes/');
            const subclassesResposta = await fetch('http://localhost:5001/subclasses/');

            const metodosJson = await metodosResposta.json();
            const categoriasJson = await categoriasResposta.json();
            const subcategoriasJson = await subcategoriasResposta.json();
            const classesJson = await classesResposta.json();
            const subclassesJson = await subclassesResposta.json();

            setMetodosPagamento(metodosJson);
            setCategorias(categoriasJson);
            setSubcategorias(subcategoriasJson);
            setClasses(classesJson);
            setSubclasses(subclassesJson);

            // Defina as abas dinamicamente com base nas categorias
            definirAbas(categoriasJson); // Agora definindo abas com as categorias recebidas

            // Definindo a aba ativa como a primeira
            if (categoriasJson && categoriasJson.length > 0) {
                definirAbas(categoriasJson);// Inicia com a primeira categoria
            } else {
                console.error("Erro: Nenhuma categoria encontrada.");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const obterDados = async () => {
        try {
            const resposta = await fetch('http://localhost:5001/transacoes/');
            if (!resposta.ok) {
                throw new Error(`HTTP error! Status: ${resposta.status}`);
            }
            const dadosJson = await resposta.json();
            definirDados(dadosJson);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const formatarData = (data) => {
        if (!data) return ""; 
        const dataFormatada = new Date(data);
        return format(dataFormatada, 'dd/MM/yyyy');
    };

    const atualizarDados = async () => {
        await obterDados();
    };

    const calcularTotal = (lista) => {
        return lista.reduce((total, dado) => total + parseFloat(dado.valor), 0).toFixed(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoDado({
            ...novoDado,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const categoria = abas.find(aba => aba && aba.cat_nome === abaAtiva);
        if (!abas || abas.length === 0) {
            return <div>Carregando categorias...</div>;
        }
        console.log(abas);  
        console.log(categoria);

        const categoria_id = categoria ? categoria.id : null;

        if (!novoDado.descricao || !novoDado.valor) {
            console.log('Please fill in all required fields.');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5001/transacoes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...novoDado, categoria_id })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            setNovoDado({
                descricao: '',
                valor: '',
                metodo_pagamento_id: '',
                remetente_id: '',
                subcategoria_id: '',
                classe_id: '',
                subclasse_id: '',
                data: ''
            });
    
            setShowForm(false);
            obterDados();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        obterOpcoes();
        obterDados();
    }, []);

    return (
        <Fragment>
            <div className="List">
                <div className="tabs">
                    <div className="tab">
                        {abas.map((aba) => (
                            <button 
                                key={aba.id} // Adicionando uma key única para cada aba
                                className={`tab-button ${abaAtiva === aba.cat_nome ? 'active' : ''}`} 
                                onClick={() => definirAbaAtiva(aba.cat_nome)}
                            >
                                {aba.cat_nome}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancelar' : 'Adicionar Novo Dado'}
                    </button>
                </div>

                <Modal show={showForm} onHide={() => setShowForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Novo Dado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="form" onSubmit={handleFormSubmit}>
                            <Form.Group controlId="descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descricao"
                                    value={novoDado.descricao}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="valor">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="valor"
                                    value={novoDado.valor}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="metodo">
                                <Form.Label>Método de Pagamento</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="metodo_pagamento_id"
                                    value={novoDado.metodo_pagamento_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione o método</option>
                                    {metodosPagamento.map((metodo) => (
                                        <option key={metodo.id} value={metodo.id}>{metodo.metodo_pag_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="remetente">
                                <Form.Label>Remetente</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="remetente_id"
                                    value={novoDado.remetente_id}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="subcategoria_id">
                                <Form.Label>Subcategoria</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subcategoria_id"
                                    value={novoDado.subcategoria_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a subcategoria</option>
                                    {subcategorias.map((subcategoria) => (
                                        <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.subcat_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="classe">
                                <Form.Label>Classe</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="classe_id"
                                    value={novoDado.classe_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a classe</option>
                                    {classes.map((classe) => (
                                        <option key={classe.id} value={classe.id}>{classe.class_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="subclasse">
                                <Form.Label>Subclasse</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subclasse_id"
                                    value={novoDado.subclasse_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a subclasse</option>
                                    {subclasses.map((subclasse) => (
                                        <option key={subclasse.id} value={subclasse.id}>{subclasse.subclass_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="data">
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="data"
                                    value={novoDado.data}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Adicionar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Método de Pagamento</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.filter(dado => dado.categoria.cat_nome === abaAtiva).map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.descricao}</td>
                                <td>{dado.valor}</td>
                                <td>{dado.metodo_pagamento.nome}</td>
                                <td>{formatarData(dado.data)}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deletarDado(dado.id)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </Button>
                                    <EditarDados atualizarDados={atualizarDados} dado={dado} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Total: R$ {calcularTotal(dados.filter(dado => dado.categoria.cat_nome === abaAtiva))}</h3>
            </div>
        </Fragment>
    );
};

export default ListarDados;
