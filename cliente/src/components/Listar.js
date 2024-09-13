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
    const [abaAtiva, definirAbaAtiva] = useState('ganhos');
    const [showForm, setShowForm] = useState(false);
    const [novoDado, setNovoDado] = useState({
        descricao: '',
        valor: '',
        metodo: '',
        remetente: '',
        subcategoria: '',
        classe: '',
        subclasse: '',
        datagregoriana: ''
    });

    const deletarDado = async (id) => {
        try {
          await fetch(`http://127.0.0.1:5001/gerenciador-financeiro/${id}`, {
            method: 'DELETE',
          });
          definirDados(dados.filter((dado) => dado.id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    const obterDados = async () => {
        try {
            const resposta = await fetch('http://127.0.0.1:5001/gerenciador-financeiro/');
            const dadosJson = await resposta.json();
            definirDados(dadosJson);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obterDados();
    }, []);

    const formatarData = (data) => {
        if (!data) return ""; // Tratamento para data vazia
        const dataFormatada = new Date(data);
        return format(dataFormatada, 'dd/MM/yyyy');
    };

    const totalGastosElement = dados.filter(dado => dado.categoria === 'Gastos').map(dado => (
        <tr key={dado.id}>
            <td>{dado.descricao}</td>
            <td>R${parseFloat(dado.valor).toFixed(2)}</td>
            <td>{formatarData(dado.datagregoriana)}</td>
            <td>
                <EditarDados dado={dado} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deletarDado(dado.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff", fontSize: "17px" }} />
                </button>
            </td>
        </tr>
    ));

    const totalGanhosElement = dados.filter(dado => dado.categoria === 'Ganhos').map(dado => (
        <tr key={dado.id}>
            <td>{dado.descricao}</td>
            <td>R${parseFloat(dado.valor).toFixed(2)}</td>
            <td>{formatarData(dado.datagregoriana)}</td>
            <td>
                <EditarDados dado={dado} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deletarDado(dado.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff", fontSize: "17px" }} />
                </button>
            </td>
        </tr>
    ));

    const dadosGastos = dados.filter(dado => dado.categoria === 'Gastos');
    const dadosGanhos = dados.filter(dado => dado.categoria === 'Ganhos');

    const calcularTotal = (lista) => {
        return lista.reduce((total, dado) => total + parseFloat(dado.valor), 0).toFixed(2);
    };

    const agruparGastosPorClasse = () => {
        return dadosGastos.reduce((acumulador, gasto) => {
            const classe = gasto.classe || 'Outros'; 
            if (!acumulador[classe]) {
                acumulador[classe] = 0;
            }
            acumulador[classe] += parseFloat(gasto.valor);
            return acumulador;
        }, {});
    };

    const agruparGanhosPorClasse = () => {
        return dadosGanhos.reduce((acumulador, ganho) => {
            const classe = ganho.classe || 'Outros'; 
            if (!acumulador[classe]) {
                acumulador[classe] = 0;
            }
            acumulador[classe] += parseFloat(ganho.valor);
            return acumulador;
        }, {});
    };

    const dadosAgrupadosPorClasseGastos = agruparGastosPorClasse();
    const dadosAgrupadosPorClasseGanhos = agruparGanhosPorClasse();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoDado({
            ...novoDado,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const categoria = abaAtiva === 'ganhos' ? 'Ganhos' : 'Gastos';

        try {
            await fetch('http://127.0.0.1:5001/gerenciador-financeiro/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...novoDado, categoria })
            });

            setNovoDado({
                descricao: '',
                valor: '',
                metodo: '',
                remetente: '',
                subcategoria: '',
                classe: '',
                subclasse: '',
                datagregoriana: ''
            });

            setShowForm(false);
            obterDados();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className="List">
                <div className="tabs">
                    <div className="tab">
                        
                        <button 
                            className={`tab-button ${abaAtiva === 'ganhos' ? 'active' : ''}`} 
                            onClick={() => definirAbaAtiva('ganhos')}
                        >
                            Ganhos
                        </button>
                        <button 
                            className={`tab-button ${abaAtiva === 'gastos' ? 'active' : ''}`} 
                            onClick={() => definirAbaAtiva('gastos')}
                        >
                            Gastos
                        </button>
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
                                <Form.Label>Método</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="metodo"
                                    value={novoDado.metodo}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="remetente">
                                <Form.Label>Remetente</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="remetente"
                                    value={novoDado.remetente}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="subcategoria">
                                <Form.Label>Subcategoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subcategoria"
                                    value={novoDado.subcategoria}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="classe">
                                <Form.Label>Classe</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="classe"
                                    value={novoDado.classe}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="subclasse">
                                <Form.Label>Subclasse</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subclasse"
                                    value={novoDado.subclasse}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="datagregoriana">
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="datagregoriana"
                                    value={novoDado.datagregoriana}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit">
                                Adicionar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {abaAtiva === 'ganhos' && (
                    <div className="content">
                        <div className="ganhos">
                            <div className="List__ganhos">
                                <h4>Ganhos</h4>
                                <table className="table mt-5 text-center">
                                    <thead>
                                        <tr>
                                            <th>Descrição</th>
                                            <th>Valor</th>
                                            <th>Data</th>
                                            <th>Editar</th>
                                            <th>Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {totalGanhosElement}
                                    </tbody>
                                </table>
                                <h4>Total Ganhos: R${calcularTotal(dadosGanhos)}</h4>
                            </div>

                            <div className="grafico-ganhos">
                                <GraficoPizzaGanhos dadosGanhosPorClasse={dadosAgrupadosPorClasseGanhos} />
                            </div>
                        </div>
                    </div>
                )}

                {abaAtiva === 'gastos' && (
                    <div className="content">
                        <div className="gastos">
                            <div className="List__gastos">
                                <h4>Gastos</h4>
                                <table className="table mt-5 text-center">
                                    <thead>
                                        <tr>
                                            <th>Descrição</th>
                                            <th>Valor</th>
                                            <th>Data</th>
                                            <th>Editar</th>
                                            <th>Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {totalGastosElement}
                                    </tbody>
                                </table>
                                <h4>Total Gastos: R${calcularTotal(dadosGastos)}</h4>
                            </div>

                            <div className="grafico-gastos">
                                <GraficoPizzaGastos dadosGastosPorClasse={dadosAgrupadosPorClasseGastos} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default ListarDados;
