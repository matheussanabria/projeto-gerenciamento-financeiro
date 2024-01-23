import './App.css';
import React, { Fragment } from 'react';

// components
import InserirDados from './components/Inserir';
import ListarDados from './components/Listar';
function App() {
  return (
    <Fragment>
      <div className='centro'>
        <InserirDados/>
        <ListarDados/>
      </div>
    </Fragment>
  )
}

export default App;
