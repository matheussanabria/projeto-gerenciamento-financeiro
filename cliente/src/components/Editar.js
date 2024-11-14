import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

const EditarDados = ({ dado, onUpdate }) => {
    const [descricao, setDescricao] = useState(dado.descricao);
    const [valor, setValor] = useState(dado.valor);
    const [metodo_pagamento_id, setMetodoPagamento] = useState(dado.metodo_pagamento_id);
    const [remetente_id, setRemetente_id] = useState(dado.remetente_id);
    const [categoria_id, setCategoriaId] = useState(dado.subcategoria_id);
    const [subcategoria_id, setSubcategoriaId] = useState(dado.subcategoria_id);
    const [classe_id, setClasse] = useState(dado.classe_id);
    const [subclasse_id, setSubclasse] = useState(dado.subclasse_id);
    const [data, setData] = useState(dado.data);
    
    // Estado para armazenar as opções dinâmicas
    const [metodosPagamento, setMetodosPagamento] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subclasses, setSubclasses] = useState([]);

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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obterOpcoes();
    }, []);

    const atualizarDados = async (e) => {
        e.preventDefault();

        try {
            const body = {
                descricao,
                valor,
                metodo_pagamento_id,
                remetente_id,
                categoria_id,
                subcategoria_id,
                classe_id,
                subclasse_id,
                data,
            };

            await fetch(`http://localhost:5001/transacoes/${dado.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            onUpdate(); // Call onUpdate to refresh data
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${dado.id}`}
            >
                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff", fontSize: "17px" }} />
            </button>
            <div className="modal" id={`id${dado.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Editar operação</h4>
                            <button type="button" className="close" data-bs-dismiss="modal">X</button>
                        </div>
                        <div className="modal-body">
                            <Form onSubmit={atualizarDados}>
                                <Form.Group controlId="descricao">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={descricao}
                                        onChange={e => setDescricao(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="valor">
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={valor}
                                        onChange={e => setValor(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="metodo_pagamento_id">
                                    <Form.Label>Método de Pagamento</Form.Label>
                                    <Form.Control as="select" value={metodo_pagamento_id} onChange={e => setMetodoPagamento(e.target.value)}>
                                        <option value="">Selecione o método</option>
                                        {metodosPagamento.map(m => (
                                            <option key={m.id} value={m.nome}>{m.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="remetente_id">
                                    <Form.Label>Remetente</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={remetente_id}
                                        onChange={e => setRemetente_id(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="categoria_id">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Control as="select" value={categoria_id} onChange={e => setCategoriaId(e.target.value)}>
                                        <option value="">Selecione a subcategoria</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="subcategoria_id">
                                    <Form.Label>Subcategoria</Form.Label>
                                    <Form.Control as="select" value={subcategoria_id} onChange={e => setSubcategoriaId(e.target.value)}>
                                        <option value="">Selecione a subcategoria</option>
                                        {subcategorias.map(s => (
                                            <option key={s.id} value={s.id}>{s.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="classe_id">
                                    <Form.Label>Classe</Form.Label>
                                    <Form.Control as="select" value={classe_id} onChange={e => setClasse(e.target.value)}>
                                        <option value="">Selecione a classe</option>
                                        {classes.map(c => (
                                            <option key={c.id} value={c.id}>{c.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="subclasse_id">
                                    <Form.Label>Subclasse</Form.Label>
                                    <Form.Control as="select" value={subclasse_id} onChange={e => setSubclasse(e.target.value)}>
                                        <option value="">Selecione a subclasse</option>
                                        {subclasses.map(s => (
                                            <option key={s.id} value={s.id}>{s.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="data">
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={data}
                                        onChange={e => setData(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit">Editar</Button>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditarDados;
