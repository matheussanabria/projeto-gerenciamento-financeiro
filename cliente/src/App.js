import './App.css';
import React, { Fragment } from 'react';

// components
// import InserirDados from './components/Inserir'; 
import ListarDados from './components/Listar';
import GerenciarCategorias from './components/gerenciarHierarquias';

function App() {
  return (
    <Fragment>
      <div className='centro'>
      {/*
        <InserirDados/>
      */}
        <ListarDados/>
        <GerenciarCategorias/>
      </div>
    </Fragment>
  )
}

export default App;
