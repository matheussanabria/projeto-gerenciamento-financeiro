    import React, { useState, useEffect } from "react"; // Importa as bibliotecas React e hooks useState e useEffect
    import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap'; // Importa componentes do React-Bootstrap

    // Componente principal para gerenciar categorias
    const GerenciarCategorias = () => {
        // Estados do componente
        const [showForm, setShowForm] = useState(false); // Controla se o formulário está visível
        const [tipo, setTipo] = useState('categorias'); // Tipo de item (categorias, subcategorias, classes, subclasses)
        const [novoItem, setNovoItem] = useState({ nome: '', categoria_id: '', subcategoria_id: '', classe_id: '' }); // Armazena os dados do novo item
        const [categorias, setCategorias] = useState([]); // Armazena a lista de categorias
        const [subcategorias, setSubcategorias] = useState([]); // Armazena a lista de subcategorias
        const [classes, setClasses] = useState([]); // Armazena a lista de classes
        const [subclasses, setSubclasses] = useState([]); // Armazena a lista de subclasses
        const [itemEditando, setItemEditando] = useState(null); // Armazena o item que está sendo editado
        const [loading, setLoading] = useState(true); // Controla o estado de carregamento
        const [error, setError] = useState(null); // Armazena mensagens de erro

        // Função para buscar dados de um endpoint
        const fetchData = async (endpoint) => {
            try {
                const response = await fetch(`http://localhost:5001/${endpoint}/`); // Faz uma requisição para o servidor
                if (!response.ok) throw new Error("Falha ao carregar os dados."); // Se a resposta não for bem-sucedida, lança um erro
                const data = await response.json(); // Converte a resposta em JSON
                console.log(`Dados recebidos de ${endpoint}:`, data); // Log dos dados recebidos
                return data; // Retorna os dados recebidos
            } catch (err) {
                setError(err.message); // Se ocorrer um erro, atualiza o estado de erro
            }
        };
        
        // Efeito colateral para carregar os dados ao montar o componente
        useEffect(() => {
            const loadData = async () => {
                setLoading(true); // Define o estado de carregamento como verdadeiro
                await Promise.all([
                    fetchData('categorias').then(setCategorias), // Busca categorias
                    fetchData('subcategorias').then(setSubcategorias), // Busca subcategorias
                    fetchData('classes').then(setClasses), // Busca classes
                    fetchData('subclasses').then(setSubclasses) // Busca subclasses
                ]);
                setLoading(false); // Define o estado de carregamento como falso
            };

            loadData(); // Chama a função para carregar os dados
        }, []); // O array vazio indica que o efeito deve rodar apenas uma vez, quando o componente é montado

        // Função para lidar com mudanças nos campos do formulário
        const handleInputChange = (e) => {
            const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
            setNovoItem(prev => ({ ...prev, [name]: value })); // Atualiza o estado do novo item com o novo valor
        };

        // Função para lidar com a submissão do formulário
        const handleFormSubmit = async (e) => {
            e.preventDefault(); // Previne o comportamento padrão do formulário (recarga da página)
        
            const urlBase = `http://localhost:5001/${tipo}`; // Define a URL base de acordo com o tipo
            const tipoSingular = tipo.slice(0, -1); // Remove o "s" do tipo para obter a versão singular
            const tipoIdKey = `${tipoSingular}_id`; // Define a chave do ID do item
            const id = itemEditando ? itemEditando[tipoIdKey] : null; // Obtém o ID do item que está sendo editado, se houver
            const url = id ? `${urlBase}/${id}` : urlBase; // Define a URL completa, incluindo o ID se for uma edição

            const method = itemEditando ? 'PUT' : 'POST'; // Define o método HTTP: PUT para editar, POST para criar
            
            // Verifica se o nome do novo item foi preenchido
            if (!novoItem.nome) return alert(`O nome do(a) ${tipoSingular} é obrigatório.`);
        
            // Variáveis para armazenar apenas os IDs necessários
            let categoria_id = null; // Inicializa o ID da categoria
            let subcategoria_id = null; // Inicializa o ID da subcategoria
            let classe_id = null; // Inicializa o ID da classe
        
            // Define apenas os IDs relevantes para o tipo atual
            if (tipo === 'subcategorias') {
                categoria_id = novoItem.categoria_id; // Obtém o ID da categoria se for subcategoria
                if (!categoria_id) return alert("O campo categoria_id é obrigatório para subcategorias."); // Valida o ID
            } else if (tipo === 'classes') {
                subcategoria_id = Number(novoItem.subcategoria_id); // Obtém o ID da subcategoria se for classe
                if (!subcategoria_id) return alert("O campo subcategoria_id é obrigatório para classes."); // Valida o ID
            } else if (tipo === 'subclasses') {
                classe_id = novoItem.classe_id; // Obtém o ID da classe se for subclasse
                if (!classe_id) return alert("O campo classe_id é obrigatório para subclasses."); // Valida o ID
            }
        
            // Apenas inclui os campos relevantes para o tipo no corpo da requisição
            const itemParaEnviar = { nome: novoItem.nome }; // Cria um objeto com o nome do novo item
            if (categoria_id) itemParaEnviar.categoria_id = categoria_id; // Adiciona o ID da categoria, se existir
            if (subcategoria_id) itemParaEnviar.subcategoria_id = subcategoria_id; // Adiciona o ID da subcategoria, se existir
            if (classe_id) itemParaEnviar.classe_id = classe_id; // Adiciona o ID da classe, se existir
        
            console.log("Dados a serem enviados:", itemParaEnviar); // Log dos dados a serem enviados
        
            try {
                console.log("URL da requisição:", url); // Log da URL da requisição
                const resposta = await fetch(url, {
                    method, // Método HTTP (POST ou PUT)
                    headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo
                    body: JSON.stringify(itemParaEnviar), // Converte os dados para JSON
                });
            
                console.log("Resposta do servidor:", resposta); // Log da resposta do servidor
                
                if (!resposta.ok) {
                    const errorMessage = await resposta.text(); // Obtém a mensagem de erro em texto, se houver
                    throw new Error(errorMessage || "Erro ao criar/editar o item."); // Lança um erro
                }
            
                const resultado = await resposta.json(); // Converte a resposta em JSON
                console.log("Resultado da operação:", resultado); // Log do resultado da operação
            
                // Verifica se resultado contém a chave 'id'
                if (!resultado || !resultado.id) {
                    throw new Error("Resposta inesperada do servidor."); // Lança um erro se a resposta não for esperada
                }
            
                // Função para atualizar o estado da lista com o novo item
                const updateState = (list, item) => {
                    const idKeyExists = itemEditando && 'id' in item; // Verifica se a chave 'id' existe
                    return idKeyExists
                        ? list.map(i => (i.id === item.id ? item : i)) // Se existir, atualiza o item na lista
                        : [...list, item]; // Se não existir, adiciona o novo item à lista
                };
            
                // Atualiza o estado da lista correspondente ao tipo
                switch (tipo) {
                    case 'categorias':
                        setCategorias(prev => updateState(prev, resultado)); // Atualiza categorias
                        break;
                    case 'subcategorias':
                        setSubcategorias(prev => updateState(prev, resultado)); // Atualiza subcategorias
                        break;
                    case 'classes':
                        setClasses(prev => updateState(prev, resultado)); // Atualiza classes
                        break;
                    case 'subclasses':
                        setSubclasses(prev => updateState(prev, resultado)); // Atualiza subclasses
                        break;
                    default:
                        break; // Não faz nada se o tipo não for reconhecido
                }
            
                resetForm(); // Limpa o formulário após a operação
            } catch (error) {
                console.error("Erro ao salvar:", error); // Log do erro
                alert("Ocorreu um erro ao salvar os dados. Tente novamente."); // Alerta o usuário
            }
        };

        // Função para redefinir o formulário
        const resetForm = () => {
            setNovoItem({ nome: '', categoria_id: '', subcategoria_id: '', classe_id: '' }); // Reseta os campos do formulário
            setItemEditando(null); // Limpa o item em edição
            setShowForm(false); // Fecha o formulário
        };

        // Função para lidar com a edição de um item
        const handleEdit = (item) => {
            setNovoItem({ nome: item.nome, categoria_id: item.categoria_id, subcategoria_id: item.subcategoria_id, classe_id: item.classe_id }); // Define os valores do item a ser editado
            setItemEditando(item); // Atualiza o estado do item em edição
            setShowForm(true); // Abre o formulário
        };

        // Função para excluir um item
        const handleDelete = async (item) => {
            if (window.confirm("Você realmente deseja excluir este item?")) { // Confirma a exclusão
                const url = `http://localhost:5001/${tipo}/${item.id}`; // Define a URL para exclusão do item
                try {
                    const resposta = await fetch(url, { method: 'DELETE' }); // Faz a requisição para deletar
                    if (!resposta.ok) throw new Error("Erro ao excluir o item."); // Lança um erro se a resposta não for bem-sucedida
                    alert("Item excluído com sucesso!"); // Alerta o usuário do sucesso
                    switch (tipo) {
                        case 'categorias':
                            setCategorias(prev => prev.filter(i => i.id !== item.id)); // Remove a categoria da lista
                            break;
                        case 'subcategorias':
                            setSubcategorias(prev => prev.filter(i => i.id !== item.id)); // Remove a subcategoria da lista
                            break;
                        case 'classes':
                            setClasses(prev => prev.filter(i => i.id !== item.id)); // Remove a classe da lista
                            break;
                        case 'subclasses':
                            setSubclasses(prev => prev.filter(i => i.id !== item.id)); // Remove a subclasse da lista
                            break;
                        default:
                            break; // Não faz nada se o tipo não for reconhecido
                    }
                } catch (error) {
                    console.error("Erro ao excluir:", error); // Log do erro
                    alert("Ocorreu um erro ao excluir o item. Tente novamente."); // Alerta o usuário
                }
            }
        };

        // Função para alterar o tipo de item
        const handleTipoChange = (e) => {
            setTipo(e.target.value); // Atualiza o tipo com o valor selecionado
            resetForm(); // Limpa o formulário
        };

        // Retorna o JSX do componente
        return (
            <div>
                <h1>Gerenciar {tipo}</h1> {/* Título do componente */}
                               {/* Select para mudar o tipo de item a ser gerenciado */}
                               <Form.Select value={tipo} onChange={handleTipoChange}>
                    <option value="categorias">Categorias</option>
                    <option value="subcategorias">Subcategorias</option>
                    <option value="classes">Classes</option>
                    <option value="subclasses">Subclasses</option>
                </Form.Select>

                {/* Botão para abrir o formulário de criação */}
                <Button variant="primary" onClick={() => setShowForm(true)}>
                    Adicionar {tipo.slice(0, -1)}
                </Button>

                {/* Lista dos itens com opções de editar e excluir */}
                {loading ? (
                    <Spinner animation="border" />
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <ul>
                        {tipo === 'categorias' && categorias.map(item => (
                            <li key={item.id}>
                                {item.nome} 
                                <Button variant="secondary" onClick={() => handleEdit(item)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(item)}>Excluir</Button>
                            </li>
                        ))}
                        {tipo === 'subcategorias' && subcategorias.map(item => (
                            <li key={item.id}>
                                {item.nome} 
                                <Button variant="secondary" onClick={() => handleEdit(item)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(item)}>Excluir</Button>
                            </li>
                        ))}
                        {tipo === 'classes' && classes.map(item => (
                            <li key={item.id}>
                                {item.nome} 
                                <Button variant="secondary" onClick={() => handleEdit(item)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(item)}>Excluir</Button>
                            </li>
                        ))}
                        {tipo === 'subclasses' && subclasses.map(item => (
                            <li key={item.id}>
                                {item.nome} 
                                <Button variant="secondary" onClick={() => handleEdit(item)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(item)}>Excluir</Button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Modal para criação/edição de itens */}
                <Modal show={showForm} onHide={resetForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>{itemEditando ? 'Editar' : 'Adicionar'} {tipo.slice(0, -1)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={novoItem.nome}
                                    onChange={handleInputChange}
                                    placeholder={`Digite o nome do(a) ${tipo.slice(0, -1)}`}
                                />
                            </Form.Group>

                            {tipo === 'subcategorias' && (
                                <Form.Group>
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Select
                                        name="categoria_id"
                                        value={novoItem.categoria_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        {categorias.map(c => (
                                            <option key={c.id} value={c.id}>{c.nome}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            )}

                            {tipo === 'classes' && (
                                <Form.Group>
                                    <Form.Label>Subcategoria</Form.Label>
                                    <Form.Select
                                        name="subcategoria_id"
                                        value={novoItem.subcategoria_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecione uma subcategoria</option>
                                        {subcategorias.map(s => (
                                            <option key={s.id} value={s.id}>{s.nome}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            )}

                            {tipo === 'subclasses' && (
                                <Form.Group>
                                    <Form.Label>Classe</Form.Label>
                                    <Form.Select
                                        name="classe_id"
                                        value={novoItem.classe_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecione uma classe</option>
                                        {classes.map(c => (
                                            <option key={c.id} value={c.id}>{c.nome}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            )}

                            <Button type="submit" variant="success">
                                {itemEditando ? 'Salvar Alterações' : 'Adicionar'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    };

    export default GerenciarCategorias;
