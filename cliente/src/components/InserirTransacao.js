import React, { Fragment, useState, useEffect} from 'react';
import { format } from "date-fns"; // Função para formatar datas
import { Modal, Button, Form } from 'react-bootstrap'; // Importação de componentes do Bootstrap para o layout (modal, botões, formulário)

const InserirTransacao = () => {
    const [abas, definirAbas] = useState([]); // Categorias que serão exibidas como abas
    const [abaAtiva, definirAbaAtiva] = useState(''); // Define qual aba está ativa (por padrão 'Gastos')
    const [showForm, setShowForm] = useState(false); // Controla se o formulário para adicionar novos dados está visível
    const [novoDado, setNovoDado] = useState({ // Dados do novo item que será adicionado
            descricao: '', // Descrição da transação
            valor: '', // Valor da transação
            remetente_nome: '', // Identificador do remetente
            metodo_pagamento_nome: '', // Identificador do método de pagamento
            numero_parcelas: '', // Identificador do parcelamento
            conta_nome: '', // Identificador da conta
            categoria_nome: '', // Identificador da categoria
            subcategoria_nome: '', // Identificador da subcategoria
            classe_nome: '', // Identificador da classe
            subclasse_nome: '', // Identificador da subclasse
            data: '' // Data da transação
        });
    // const [descricao, definirDescricao] = useState('')
    // const [valor, definirValor] = useState('')
    // const [remetente, definirRemetente] = useState('')
    // const [metodosPagamento, setMetodosPagamento] = useState('')
    // const [parcelamento, definirParcelamento] = useState('')
    // const [conta, definirConta] = useState('')
    // const [categoria, definirCategoria] = useState('')
    // const [subcategoria, definirSubcategoria] = useState('')
    // const [classe, definirClasse] = useState('')
    // const [subclasse, definirSubclasse] = useState('')
    // const [data, definirData] = useState('')
    // const [sincronario, definirSincronario] = useState('')
    // const [plasma, definirPlasma] = useState('')
    // const [heptal, definirHeptal] = useState('')
    // const [lua, definirLua] = useState('')
    
    // Função para obter as opções (dados das listas de remetentes, métodos de pagamento, etc.)
     
    // Outros estados que armazenam listas de opções para preencher os campos do formulário
        const [remetentes, setRemetentes] = useState([]);
        const [metodosPagamento, setMetodosPagamento] = useState([]);
        const [parcelamentos, setParcelamentos] = useState([]);
        const [contas, setContas] = useState([]);
        const [categorias, setCategorias] = useState([]);
        const [subcategorias, setSubcategorias] = useState([]);
        const [classes, setClasses] = useState([]);
        const [subclasses, setSubclasses] = useState([]);

    const obterOpcoes = async () => {
        try {
            // Requisições para pegar dados do backend
            const remetentesResposta = await fetch('http://localhost:5001/remetentes/');
            const metodosResposta = await fetch('http://localhost:5001/metodos-pagamento/');
            const parcelamentosResposta = await fetch('http://localhost:5001/parcelamentos/');
            const contasResposta = await fetch('http://localhost:5001/contas/');
            const categoriasResposta = await fetch('http://localhost:5001/categorias/');
            const subcategoriasResposta = await fetch('http://localhost:5001/subcategorias/');
            const classesResposta = await fetch('http://localhost:5001/classes/');
            const subclassesResposta = await fetch('http://localhost:5001/subclasses/');

            // Converte a resposta em JSON (formato que o React pode entender)
            const remetentesJson = await remetentesResposta.json();
            const metodosJson = await metodosResposta.json();
            const parcelamentosJson = await parcelamentosResposta.json();
            const contasJson = await contasResposta.json();
            const categoriasJson = await categoriasResposta.json();
            const subcategoriasJson = await subcategoriasResposta.json();
            const classesJson = await classesResposta.json();
            const subclassesJson = await subclassesResposta.json();

            // Atualiza os estados com os dados obtidos
            setRemetentes(remetentesJson);
            setMetodosPagamento(metodosJson);
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

     // Função para formatar a data para exibição
        const formatarData = (data) => {
            if (!data) return ""; // Se não houver data, retorna uma string vazia
            const dataFormatada = new Date(data); // Cria um objeto de data a partir da string
            return format(dataFormatada, 'dd/MM/yyyy'); // Formata a data no formato 'dd/MM/yyyy'
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
        let categoria = abas.find(aba => aba && aba.categoria_nome === abaAtiva);
        
        // Se a categoria não existir, cria uma nova com ID gerado
        if (!categoria) {
            console.log('Categoria não encontrada. Criando nova categoria.');
            
            // Gerar um novo ID (pode ser um UUID ou algo similar)
            const novoId = generateNewId();
            
            // Criação de uma nova categoria (se necessário)
            categoria = {
                categoria_nome: abaAtiva,
                categoria_id: novoId,
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
                metodo_pagamento_nome: '',
                numero_parcelas: '',
                conta_nome: '',
                categoria_nome: '',
                subcategoria_nome: '',
                classe_nome: '',
                subclasse_nome: '',
                data: ''
            });

            setShowForm(false); // Fecha o formulário

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
        }, []); // O segundo argumento vazio significa que isso vai ocorrer apenas uma vez quando o componente for carregado
    

    
    

    return (
        <Fragment>
            <div className='Inserir'>  
                {/* Modal para adicionar transacao */}
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancelar' : 'Adicionar Novo Dado'}
                    </button>
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
                                <Form.Label>Método de Pagamento</Form.Label>
                                <Form.Control 
                                    className="form-input" 
                                    as="select"
                                    name="metodo_pagamento_nome"
                                    value={novoDado.metodo_pagamento_nome}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione o método</option>
                                    {metodosPagamento.map((metodo) => (
                                        <option key={metodo.id} value={metodo.nome}>{metodo.nome}</option>
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
                                        <option key={cat.id} value={cat.categoria_nome}>{cat.categoria_nome}</option>
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
                                        <option key={subCat.subcategoria_nome} value={subCat.subcategoria_nome}>{subCat.subcategoria_nome}</option>
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
                {/* <h1 className='text-center mt-5'>Adicionar operação financeira</h1>
                <form className='d-flex mt-5' onSubmit={Enviar}>
                    <div className='form-group'>
                        <label htmlFor={descricao}>Descrição:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira a descrição...' 
                            value={descricao} 
                            onChange={e => definirDescricao(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor={valor}>Valor:</label>
                        <input type='number'
                            className='form-control' 
                            placeholder='Insira o valor...' 
                            value={valor} 
                            onChange={e => definirValor(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor={remetente}>Remetente:</label>
                        <input type='text' 
                            className='form-control' 
                            as="select"
                            placeholder='Insira o rementente...' 
                            value={remetente} 
                            onChange={e => definirRemetente(e.target.value)}
                        />
                        <option value="">Selecione o remetente</option>
                        {remetentes.map((remetente) => (
                            <option key={remetente.id} value={remetente.remetente_nome}>{remetente.remetente_nome}</option>
                        ))}
                    </div>  
                    <div className='form-group'>
                        <label htmlFor={metodo}>Método de Pagamento:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira o método de pagamento...' 
                            value={metodo} 
                            onChange={e => definirMetodo(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor={categoria}>Categoria:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira a categoria...' 
                            value={categoria} 
                            onChange={e => definirCategoria(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor={subcategoria}>Subcategoria:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira a subcategoria...' 
                            value={subcategoria} 
                            onChange={e => definirSubcategoria(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor={classe}>Classe:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira a classe...' 
                            value={classe} 
                            onChange={e => definirClasse(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor={subclasse}>Subclasse:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira a subclasse...' 
                            value={subclasse} 
                            onChange={e => definirSubclasse(e.target.value)}
                        />
                    </div>  
                    <div className='form-group'>
                        <label htmlFor={dataGregoriana}>Data gregoriana:</label>
                        <input type='date' 
                            className='form-control' 
                            placeholder='Insira a descrição...' 
                            value={dataGregoriana} 
                            onChange={e => definirDataGregoriana(e.target.value)}
                        />
                    </div> */}
                    
                    {/* <input type='text' 
                        className='form-control' 
                        placeholder='Insira a data sincronica...' 
                        value={sincronario} 
                        onChange={e => definirSincronario(e.target.value)}
                    />
                    <input type='text' 
                        className='form-control' 
                        placeholder='Insira o plasma radial...' 
                        value={plasma} 
                        onChange={e => definirPlasma(e.target.value)}
                    />
                    <input type='text' 
                        className='form-control' 
                        placeholder='Insira o heptal...' 
                        value={heptal} 
                        onChange={e => definirHeptal(e.target.value)}
                    />
                    <input type='text' 
                        className='form-control' 
                        placeholder='Insira a lua...' 
                        value={lua} 
                        onChange={e => definirLua(e.target.value)}
                    /> */}
                    
                    {/* <button className='btn btn-success' type="submit"> Adicionar</button>
                </form> */}
            </div>
        </Fragment>
    )
}

export default InserirTransacao;