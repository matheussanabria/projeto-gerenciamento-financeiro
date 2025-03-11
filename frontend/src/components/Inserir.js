import React, { Fragment, useState } from 'react';

const InserirDados = () => {
    const [descricao, definirDescricao] = useState('')
    const [valor, definirValor] = useState('')
    const [metodo, definirMetodo] = useState('')
    const [remetente, definirRemetente] = useState('')
    const [categoria, definirCategoria] = useState('')
    const [subcategoria, definirSubcategoria] = useState('')
    const [classe, definirClasse] = useState('')
    const [subclasse, definirSubclasse] = useState('')
    const [dataGregoriana, definirDataGregoriana] = useState('')
    // const [sincronario, definirSincronario] = useState('')
    // const [plasma, definirPlasma] = useState('')
    // const [heptal, definirHeptal] = useState('')
    // const [lua, definirLua] = useState('')

    const Enviar = async e => {
        e.preventDefault();

        try {
            const body = {
                descricao,
                valor,
                metodo,
                remetente,
                categoria,
                subcategoria,
                classe,
                subclasse,
                dataGregoriana
            }
    
            const resposta = await fetch(`http://127.0.0.1:5001/gerenciador-financeiro/`, //end-point back-end
                {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(body)
                }
            )

    
            //console.log('Operação financeira adicionada com sucesso!');
            window.location = '/'
        } catch (error) {
            console.log(error)
        }
    }
    

    
    

    return (
        <Fragment>
            <div className='Inserir'>     
                <h1 className='text-center mt-5'>Adicionar operação financeira</h1>
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
                        <label htmlFor={metodo}>Método de Pagamento:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira o método de pagamento...' 
                            value={metodo} 
                            onChange={e => definirMetodo(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor={remetente}>Remetente:</label>
                        <input type='text' 
                            className='form-control' 
                            placeholder='Insira o rementente...' 
                            value={remetente} 
                            onChange={e => definirRemetente(e.target.value)}
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
                    
                    <button className='btn btn-success' type="submit"> Adicionar</button>
                </form>
            </div>
        </Fragment>
    )
}

export default InserirDados;