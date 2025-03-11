
// importa arquivos e modulos
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
        transacao_descricao: '',
        valor: '',
        remetente_id: '',
        metodo_pagamento_id: '',
        parcelamento_id: '',
        conta_id: '',
        categoria_id: '',
        subcategoria_id: '',
        classe_id: '',
        subclasse_id: '',
        data: ''
    });
    const [remetentes, setRemetentes] = useState([]);
    const [metodosPagamento, setMetodosPagamento] = useState([]);
    const [parcelamentos, setParcelamentos] = useState([]);
    const [contas, setContas] = useState([]);
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
            const remetentesResposta = await fetch('http://localhost:5001/remetentes/');
            const metodosResposta = await fetch('http://localhost:5001/metodos-pagamento/');
            const parcelamentosResposta = await fetch('http://localhost:5001/parcelamentos/');
            const contasResposta = await fetch('http://localhost:5001/contas/');
            const categoriasResposta = await fetch('http://localhost:5001/categorias/');
            const subcategoriasResposta = await fetch('http://localhost:5001/subcategorias/');
            const classesResposta = await fetch('http://localhost:5001/classes/');
            const subclassesResposta = await fetch('http://localhost:5001/subclasses/');

            const remetentesJson = await remetentesResposta.json();
            const metodosJson = await metodosResposta.json();
            const parcelamentosJson = await parcelamentosResposta.json();
            const contasJson = await contasResposta.json();
            const categoriasJson = await categoriasResposta.json();
            const subcategoriasJson = await subcategoriasResposta.json();
            const classesJson = await classesResposta.json();
            const subclassesJson = await subclassesResposta.json();

            setRemetentes(remetentesJson);
            console.log(remetentesJson);
            setMetodosPagamento(metodosJson);
            console.log(metodosJson);
            setParcelamentos(parcelamentosJson)
            console.log(parcelamentosJson);
            setContas(contasJson);
            console.log(contasJson);
            setCategorias(categoriasJson);
            console.log(categoriasJson);
            setSubcategorias(subcategoriasJson);
            console.log(subcategoriasJson);
            setClasses(classesJson);
            console.log(classesJson);
            setSubclasses(subclassesJson);
            console.log(subclassesJson);

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
            console.log(dadosJson);
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
    
        // Certifique-se de que abas foi carregado corretamente
        if (!abas || abas.length === 0) {
            console.log('Categorias ainda não carregadas.');
            return;
        }
    
        // Encontrar a categoria ativa
        const categoria = abas.find(aba => aba && aba.categoria_nome === abaAtiva);
        
    
        // Validação dos campos obrigatórios
        if (!novoDado.transacao_descricao || !novoDado.valor) {
            console.log('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
    
        try {
            // Envio dos dados para o backend
            const response = await fetch('http://localhost:5001/transacoes/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...novoDado })
                
            });
            console.log(JSON.stringify({ ...novoDado }));

            // verifica se a resposta e bem sucedida
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            
    
            // Limpar o formulário após a submissão
            setNovoDado({
                transacao_descricao: '',
                valor: '',
                remetente_id: '',
                metodo_pagamento_id: '',
                parcelamento_id: '',
                conta_id: '',
                categoria_id: '',
                subcategoria_id: '',
                classe_id: '',
                subclasse_id: '',
                data: ''
            });
    
            setShowForm(false);
            obterDados(); // Atualiza os dados da aplicação
        } catch (error) {
            console.log('Erro ao enviar os dados:', error.message);
        }
    };
    
    useEffect(() => {
        obterOpcoes();
        obterDados();
    }, []);

    return (
        <Fragment>
            <div className="componenteListar">
                <div className="tabs">
                    <div className="tab">
                        {abas.map((aba) => (
                            <button 
                                key={aba.id} // Adicionando uma key única para cada aba
                                className={`tab-button ${abaAtiva === aba.categoria_nome ? 'active' : ''}`} 
                                onClick={() => definirAbaAtiva(aba.categoria_nome)}
                            >
                                {aba.categoria_nome}
                            </button>
                        ))}  
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancelar' : 'Adicionar Novo Dado'}
                    </button>
                </div>

                <Modal className="modal-form" show={showForm} onHide={() => setShowForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Novo Dado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="form" onSubmit={handleFormSubmit}>
                            <Form.Group className="form-group" controlId="transacao_descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    type="text"
                                    name="transacao_descricao"
                                    value={novoDado.transacao_descricao}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="valor">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    type="number"
                                    name="valor"
                                    value={novoDado.valor}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="remetente">
                                <Form.Label>Remetente</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="remetente_id"
                                    value={novoDado.remetente_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione o remetente</option>
                                    {remetentes.map((remetente) => (
                                        <option key={remetente.id} value={remetente.id}>{remetente.remetente_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="metodo">
                                <Form.Label>Método de Pagamento</Form.Label>
                                <Form.Control 
                                    className="form-input" 
                                    as="select"
                                    name="metodo_pagamento_id"
                                    value={novoDado.metodo_pagamento_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione o método</option>
                                    {metodosPagamento.map((metodo) => (
                                        <option key={metodo.id} value={metodo.id}>{metodo.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="parcelaento_id">
                                <Form.Label>Parcelamento</Form.Label>
                                <Form.Control as="select" className="form-input" name="parcelamento_id" value={novoDado.parcelamento_id} onChange={handleInputChange}>
                                    <option value="">Selecione o parcelamento</option>
                                    {/* Lista os outros parcelamentos */}
                                    {parcelamentos.map(p => (
                                        <option key={p.id} value={p.id}>{p.numero_parcelas}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="form-group" controlId="conta_id">
                                <Form.Label>Conta</Form.Label>
                                <Form.Control as="select" className="form-input" name="conta_id" value={novoDado.conta_id} onChange={handleInputChange}>
                                    <option value="">Selecione a conta</option>
                                    {contas.map(co => (
                                        <option key={co.id} value={co.id}>{co.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            

                            <Form.Group className="form-group" controlId="categoria_id">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="categoria_id"
                                    value={novoDado.categoria_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a categoria</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.categoria_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="form-group" controlId="subcategoria_id">
                                <Form.Label>Subcategoria</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="subcategoria_id"
                                    value={novoDado.subcategoria_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a subcategoria</option>
                                    {subcategorias.map((subCat) => (
                                        <option key={subCat.subcategoria_id} value={subCat.subcategoria_id}>{subCat.subcategoria_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="classe">
                                <Form.Label>Classe</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="classe_id"
                                    value={novoDado.classe_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a classe</option>
                                    {classes.map((classe) => (
                                        <option key={classe.id} value={classe.id}>{classe.classe_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="subclasse">
                                <Form.Label>Subclasse</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="subclasse_id"
                                    value={novoDado.subclasse_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a subclasse</option>
                                    {subclasses.map((subclasse) => (
                                        <option key={subclasse.id} value={subclasse.id}>{subclasse.subclasse_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="data">
                                <Form.Label>Data</Form.Label>
                                <Form.Control 
                                    className="form-input"
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
                        {dados.filter(dado => dado.categoria_nome === abaAtiva).map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.transacao_descricao}</td>
                                <td>{dado.valor}</td>
                                <td>{dado.metodo_pagamento_nome}</td>
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
                <h3>Total: R$ {calcularTotal(dados.filter(dado => dado.categoria_nome === abaAtiva))}</h3>
            </div>
        </Fragment>
    );
};

export default ListarDados;
