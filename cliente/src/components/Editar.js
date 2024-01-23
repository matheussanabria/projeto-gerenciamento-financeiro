import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const EditarDados = ({ dado }) => {// constante EditTodo = ({ parametro }) => (arrow function){}

    const [descricao, definirDescricao] = useState(dado.descricao)
    const [valor, definirValor] = useState(dado.valor)
    const [metodo, definirMetodo] = useState(dado.metodo)
    const [remetente, definirRemetente] = useState(dado.remetente)
    const [categoria, definirCategoria] = useState(dado.categoria)
    const [subcategoria, definirSubcategoria] = useState(dado.subcategoria)
    const [classe, definirClasse] = useState(dado.classe)
    const [subclasse, definirSubclasse] = useState(dado.subclasse)
    const [data_gregoriana, definirData_gregoriana] = useState(dado.data_gregoriana)

    const atualizarDados = async e => { //constante atualizarDescricao = assincrona evento arrowFunction {}
        e.preventDefault();// evento prevencao padrao
        // console.log('123');
        
        
        try {// tentar
            const body = {
                descricao,
                valor,
                metodo,
                remetente,
                categoria,
                subcategoria,
                classe,
                subclasse,  
                data_gregoriana,
            } // constante_corpo = { parametro description}
            const response = await fetch(`
            http://localhost:5000/financial-management/${dado.id}
            `,
            { // constante resposta = aguarde busca (endereco de busca $(valor)tabela_todo coluna_id)
                    method: 'PUT', // metodo : "COLOCAR"
                    headers:  { "Content-Type": "application/json" }, // cabecalhos : {"Tipo_Conteudo" : "aplicacao/json" }
                    body: JSON.stringify(body) // corpo : JSON.restringir(constante_corpo)
                }
            )
            window.location = "/" // janela.localização = "/"
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <Fragment>
            <div className="Editar">

                <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target={`#id${dado.id}`}
                >
                    <FontAwesomeIcon icon={faPenToSquare} style={{color: "#fafcff", fontSize: "17px",}} />
                </button>
                <div
                    className="modal"
                    id={`id${dado.id}`}
                    
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Editar operação</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"

                                >
                                    X
                                </button>
                            </div>{/* modal-header */}

                            <div className="modal-body">
                                <form className='d-flex mt-5'>
                                    <div className='form-group'>
                                        <label for={descricao}>Descrição:</label>
                                        <input 
                                            type='text' 
                                            className='form-control'
                                            value={descricao} 
                                            onChange={e => definirDescricao(e.target.value)}
                                        />
                                        {/* <input 
                                            type="text"
                                            className="form-control"
                                            value={description} //valor = (const descrição)
                                            onChange={e => setDescription(e.target.value)}
                                        /> */}
                                    </div>
                                    <div className='form-group'>
                                        <label for={valor}>Valor:</label>
                                        <input type='number'
                                            className='form-control' 
                                            placeholder='Insira o valor...' 
                                            value={valor} 
                                            onChange={e => definirValor(e.target.value)}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label for={metodo}>Método de Pagamento:</label>
                                        <input type='text' 
                                            className='form-control' 
                                            placeholder='Insira o método de pagamento...' 
                                            value={metodo} 
                                            onChange={e => definirMetodo(e.target.value)}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label for={remetente}>Remetente:</label>
                                        <input type='text' 
                                            className='form-control' 
                                            placeholder='Insira o rementente...' 
                                            value={remetente} 
                                            onChange={e => definirRemetente(e.target.value)}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label for={categoria}>Categoria:</label>
                                        <input type='text' 
                                            className='form-control' 
                                            placeholder='Insira a categoria...' 
                                            value={categoria} 
                                            onChange={e => definirCategoria(e.target.value)}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label for={subcategoria}>Subcategoria:</label>
                                        <input type='text' 
                                            className='form-control' 
                                            placeholder='Insira a subcategoria...' 
                                            value={subcategoria} 
                                            onChange={e => definirSubcategoria(e.target.value)}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label for={classe}>Classe:</label>
                                        <input type='text' 
                                            className='form-control' 
                                            placeholder='Insira a classe...' 
                                            value={classe} 
                                            onChange={e => definirClasse(e.target.value)}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label for={subclasse}>Subclasse:</label>
                                        <input type='text' 
                                            className='form-control' 
                                            placeholder='Insira a subclasse...' 
                                            value={subclasse} 
                                            onChange={e => definirSubclasse(e.target.value)}
                                        />
                                    </div>  
                                    <div className='form-group'>
                                        <label for={data_gregoriana}>Data gregoriana:</label>
                                        <input type='date' 
                                            className='form-control' 
                                            placeholder='Insira a descrição...' 
                                            value={data_gregoriana} 
                                            onChange={e => definirData_gregoriana(e.target.value)}
                                        />
                                    </div>
                                    
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
                                </form>
                            </div>{/* modal-body */}

                            <div className="modal-footer">
                                <button
                                    type="button"//tipo = botao
                                    className="btn btn-success"//nome classe = btn btn-aviso
                                    data-bs-dismiss="modal"//dados bs fechar = modal
                                    onClick={e => atualizarDados(e)}//evento = atualizarDescrição(evento)
                                >
                                    Editar
                                </button>
                                <button
                                    type="button" //tipo = botao
                                    className="btn btn-danger" //nome classe = btn btn-perigo
                                    data-bs-dismiss="modal" //dados bs fechar = modal
                                    //noclick = definirDescrição(tabela dado. coluna descricao)
                                >
                                    Fechar
                                </button>
                            </div>{/* modal-footer */}
                        </div>{/* modal-content */}
                    </div>{/* modal-dialog */}
                </div>{/* modal */}
            </div>
        </Fragment>
    ) 
};

export default EditarDados;