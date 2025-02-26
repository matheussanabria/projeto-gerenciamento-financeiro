// Importação de bibliotecas e módulos necessários para o funcionamento da aplicação
import React, { useState, useEffect, Fragment } from "react"; // Importa React e hooks para gerenciar o estado e efeitos
import { format } from "date-fns"; // Função para formatar datas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa ícones do FontAwesome
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'; // Ícone de lixeira (para deletar itens)
import { Modal, Button, Form } from 'react-bootstrap'; // Importação de componentes do Bootstrap para o layout (modal, botões, formulário)
import EditarDados from "../components/Editar"; // Importação do componente de edição (não utilizado no código aqui)
// import GraficoPizzaGastos from "./graficoGastos"; // Gráfico de Gastos (não usado no momento)
// import GraficoPizzaGanhos from "./graficoGanhos"; // Gráfico de Ganhos (não usado no momento)

const ListarDados = () => {
    // Declarando os estados da aplicação. O estado serve para armazenar dados e controlar a interface.
    const [dados, definirDados] = useState([]); // Dados das transações
    const [abas, definirAbas] = useState([]); // Categorias que serão exibidas como abas
    const [abaAtiva, definirAbaAtiva] = useState('Gastos'); // Define qual aba está ativa (por padrão 'Gastos')
    const [showForm, setShowForm] = useState(false); // Controla se o formulário para adicionar novos dados está visível
    const [novoDado, setNovoDado] = useState({ // Dados do novo item que será adicionado
        descricao: '', // Descrição da transação
        valor: '', // Valor da transação
        remetente_nome: '', // Identificador do remetente
        transacao_pagamento: '', // Identificador do método de pagamento
        numero_parcelas: '', // Identificador do parcelamento
        conta_nome: '', // Identificador da conta
        categoria_nome: '', // Identificador da categoria
        subcategoria_nome: '', // Identificador da subcategoria
        classe_nome: '', // Identificador da classe
        subclasse_nome: '', // Identificador da subclasse
        data: '' // Data da transação
    });

    // Outros estados que armazenam listas de opções para preencher os campos do formulário
    const [remetentes, setRemetentes] = useState([]);
    const [metodosPagamento, setMetodosPagamento] = useState([]);
    const [formasPagamento, setFormasPagamento] = useState([]);
    const [parcelamentos, setParcelamentos] = useState([]);
    const [contas, setContas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subclasses, setSubclasses] = useState([]);

    // Função para deletar um dado, enviando uma requisição para o backend
    const deletarDado = async (id) => {
        try {
          await fetch(`http://localhost:5001/transacoes/${id}`, {
            method: 'DELETE', // Método HTTP para deletar
          });
          // Após deletar, remove o dado da lista
          definirDados(dados.filter((dado) => dado.id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    // Função para obter as opções (dados das listas de remetentes, métodos de pagamento, etc.)
    const obterOpcoes = async () => {
        try {
            // Requisições para pegar dados do backend
            const remetentesResposta = await fetch('http://localhost:5001/remetentes/');
            const metodosPagamentoResposta = await fetch('http://localhost:5001/metodos-pagamento/');
            const formasPagamentoResposta = await fetch('http://localhost:5001/formas-pagamento/');
            const parcelamentosResposta = await fetch('http://localhost:5001/parcelamentos/');
            const contasResposta = await fetch('http://localhost:5001/contas/');
            const categoriasResposta = await fetch('http://localhost:5001/categorias/');
            const subcategoriasResposta = await fetch('http://localhost:5001/subcategorias/');
            const classesResposta = await fetch('http://localhost:5001/classes/');
            const subclassesResposta = await fetch('http://localhost:5001/subclasses/');

            // Converte a resposta em JSON (formato que o React pode entender)
            const remetentesJson = await remetentesResposta.json();
            const metodosJson = await metodosPagamentoResposta.json();
            const formasJson = await formasPagamentoResposta.json();
            const parcelamentosJson = await parcelamentosResposta.json();
            const contasJson = await contasResposta.json();
            const categoriasJson = await categoriasResposta.json();
            const subcategoriasJson = await subcategoriasResposta.json();
            const classesJson = await classesResposta.json();
            const subclassesJson = await subclassesResposta.json();

            // Atualiza os estados com os dados obtidos
            setRemetentes(remetentesJson);
            setMetodosPagamento(metodosJson);
            setFormasPagamento(formasJson);
            setParcelamentos(parcelamentosJson);
            setContas(contasJson);
            setCategorias(categoriasJson);
            setSubcategorias(subcategoriasJson);
            setClasses(classesJson);
            setSubclasses(subclassesJson);

            // Define as abas com base nas categorias recebidas
            definirAbas(categoriasJson);

            // Define a primeira aba como ativa
            if (categoriasJson && categoriasJson.length > 0) {
                definirAbaAtiva(categoriasJson[0].categoria_nome);
            } else {
                console.error("Erro: Nenhuma categoria encontrada.");
            }

        } catch (error) {
            console.log(error);
        }
    };

    // Função para obter os dados das transações
    const obterDados = async () => {
        try {
            const resposta = await fetch('http://localhost:5001/transacoes/');
            if (!resposta.ok) {
                throw new Error(`Erro HTTP! Status: ${resposta.status}`);
            }
            const dadosJson = await resposta.json();
            definirDados(dadosJson); // Atualiza o estado 'dados' com as transações recebidas
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    // Função para formatar a data para exibição
    const formatarData = (data) => {
        if (!data) return ""; // Se não houver data, retorna uma string vazia
        const dataFormatada = new Date(data); // Cria um objeto de data a partir da string
        return format(dataFormatada, 'dd/MM/yyyy'); // Formata a data no formato 'dd/MM/yyyy'
    };

    // Função para atualizar os dados (recarregar a lista de transações)
    const atualizarDados = async () => {
        await obterDados(); // Chama a função para obter os dados
    };

    // Função para calcular o total de valores de uma lista de transações
    const calcularTotal = (lista) => {
        return lista.reduce((total, dado) => total + parseFloat(dado.valor), 0).toFixed(2);
    };

    // Função para lidar com a mudança dos campos de input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoDado((prevState) => ({
            ...prevState, // Mantém os valores antigos e atualiza o campo que foi modificado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    // Função para lidar com o envio do formulário (quando um novo dado é adicionado)
    const handleFormSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    // Verifica se as categorias foram carregadas corretamente
    if (!abas || abas.length === 0) {
        console.log('Categorias ainda não carregadas.');
        return;
    }

    // Encontrar a categoria ativa com base nas abas
    let categoria = abas.find(aba => aba && aba.nome === abaAtiva);
    
    // Se a categoria não existir, cria uma nova com ID gerado
    if (!categoria) {
        console.log('Categoria não encontrada. Criando nova categoria.');
        
        // Gerar um novo ID (pode ser um UUID ou algo similar)
        const novoId = generateNewId();
        
        // Criação de uma nova categoria (se necessário)
        categoria = {
            nome: abaAtiva,
            id: novoId,
        };

        // Exemplo de adição do novo ID à lista de abas, se você quiser que ela seja atualizada
        abas.push(categoria); // Adiciona a nova categoria ao array (isso pode depender da sua lógica de estado)
    }

    // Validando os campos obrigatórios (descrição e valor)
    if (!novoDado.descricao || !novoDado.valor) {
        console.log('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Exibe os dados antes de enviar ao backend
    console.log('Dados com categoria ou ID criado:', novoDado);

    try {
        // Envia os dados para o backend
        const response = await fetch('http://localhost:5001/transacoes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoDado)
        });

        // Verifica se o envio foi bem-sucedido
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        // Limpa o formulário após enviar os dados
        setNovoDado({
            descricao: '',
            valor: '',
            remetente_nome: '',
            transacao_pagamento: '',
            numero_parcelas: '',
            conta_nome: '',
            categoria_nome: '',
            subcategoria_nome: '',
            classe_nome: '',
            subclasse_nome: '',
            data: ''
        });

        setShowForm(false); // Fecha o formulário
        obterDados(); // Atualiza a lista de dados

    } catch (error) {
        console.log('Erro ao enviar os dados:', error.message);
    }
};

// Função para gerar um novo ID (exemplo simples)
const generateNewId = () => {
    // Gera um ID simples com base na data e hora atual
    return 'ID_' + new Date().getTime();
};

    

    // 'useEffect' executa as funções ao carregar o componente pela primeira vez
    useEffect(() => {
        // Carregamento de dados
    const fetchData = async () => {
        try {
          const remetenteResponse = await fetch('http://localhost:5001/remetentes');
          const remetentesData = await remetenteResponse.json();
          setRemetentes(remetentesData);
  
          // Repetir para outros dados como metodosPagamento, parcelamentos, etc.
        } catch (error) {
          console.log('Erro ao carregar dados:', error);
        }
      };
      fetchData();
        obterOpcoes(); // Obtém as opções para preencher os campos do formulário
        obterDados(); // Obtém os dados das transações
    }, []); // O segundo argumento vazio significa que isso vai ocorrer apenas uma vez quando o componente for carregado

    // Renderiza a interface do usuário
    return (
        <Fragment>
            <div className="componenteListar">
                <div className="tabs">
                    <div className="tab">
                        {abas.map((aba) => (
                            <button 
                            key={aba.id}
                            className={`tab-button ${abaAtiva === aba.nome ? 'active' : ''}`} 
                            onClick={() => definirAbaAtiva(aba.nome)}
                        >
                            {aba.nome}
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
                            <Form.Group className="form-group" controlId="descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    type="text"
                                    name="descricao"
                                    value={novoDado.descricao}
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
                                    name="remetente_nome"
                                    value={novoDado.remetente_nome}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione o remetente</option>
                                    {remetentes.map((remetente) => (
                                        <option key={remetente.id} value={remetente.remetente_nome}>{remetente.remetente_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="form-group" controlId="metodo">
                                <Form.Label>Formas de Pagamento</Form.Label>
                                <Form.Control 
                                    className="form-input" 
                                    as="select"
                                    name="transacao_pagamento"
                                    value={novoDado.transacao_pagamento}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione o método</option>
                                    {formasPagamento.map((forma) => (
                                        <option key={forma.id} value={forma.nome}>{forma.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="parcelaento_id">
                                <Form.Label>Parcelamento</Form.Label>
                                <Form.Control as="select" className="form-input" name="numero_parcelas" value={novoDado.numero_parcelas} onChange={handleInputChange}>
                                    <option value="">Selecione o parcelamento</option>
                                    {/* Lista os outros parcelamentos */}
                                    {parcelamentos.map(p => (
                                        <option key={p.id} value={p.numero_parcelas}>{p.numero_parcelas}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="form-group" controlId="conta_nome">
                                <Form.Label>Conta</Form.Label>
                                <Form.Control as="select" className="form-input" name="conta_nome" value={novoDado.conta_nome} onChange={handleInputChange}>
                                    <option value="">Selecione a conta</option>
                                    {contas.map(co => (
                                        <option key={co.id} value={co.nome}>{co.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            

                            <Form.Group className="form-group" controlId="categoria_nome">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="categoria_nome"
                                    value={novoDado.categoria_nome}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a categoria</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="form-group" controlId="subcategoria_nome">
                                <Form.Label>Subcategoria</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="subcategoria_nome"
                                    value={novoDado.subcategoria_nome}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a subcategoria</option>
                                    {subcategorias.map((subCat) => (
                                        <option key={subCat.id} value={subCat.id}>{subCat.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="classe">
                                <Form.Label>Classe</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="classe_nome"
                                    value={novoDado.classe_nome}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a classe</option>
                                    {classes.map((classe) => (
                                        <option key={classe.id} value={classe.classe_nome}>{classe.classe_nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="form-group" controlId="subclasse">
                                <Form.Label>Subclasse</Form.Label>
                                <Form.Control 
                                    className="form-input"
                                    as="select"
                                    name="subclasse_nome"
                                    value={novoDado.subclasse_nome}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione a subclasse</option>
                                    {subclasses.map((subclasse) => (
                                        <option key={subclasse.id} value={subclasse.subclasse_nome}>{subclasse.subclasse_nome}</option>
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
                            <th>Remetente</th>
                            <th>Método de Pagamento</th>
                            <th>Descrição Pagamento</th>
                            <th>Conta</th>
                            <th>Subcategoria</th>
                            <th>Classe</th>
                            <th>Subclasse</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.filter(dado => dado.categoria_nome === abaAtiva).map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.descricao}</td>
                                <td>{dado.valor}</td>
                                <td>{dado.remetente_nome}</td>
                                <td>{dado.transacao_pagamento}</td>
                                <td>{dado.numero_parcelas}</td>
                                <td>{dado.conta_nome}</td>
                                <td>{dado.subcategoria_nome}</td>
                                <td>{dado.classe_nome}</td>
                                <td>{dado.subclasse_nome}</td>
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
                <h3 className="total-categoria">Total: R$ {calcularTotal(dados.filter(dado => dado.categoria_nome === abaAtiva))}</h3>
            </div>
        </Fragment>
    );
};

export default ListarDados;