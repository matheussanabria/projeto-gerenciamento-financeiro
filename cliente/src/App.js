// import React, { Fragment } from 'react';

// // components
// // import InserirDados from './components/Inserir'; 
// import ListarDados from './components/Listar';
// //import GerenciarCategorias from './components/gerenciarHierarquias';

// function App() {
//   return (
//     <Fragment>
//       <div className='centro'>
//       {/*
//         <InserirDados/>
//       */}
//         <ListarDados/>
//         {/* <GerenciarCategorias/> */}
//       </div>
//     </Fragment>
//   )
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Transacoes from './pages/Transacoes';
import './App.css';
import HierarquiasPage from './pages/Hierarquias';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Transacoes" element={<Transacoes />} />
            <Route path="/Hierarquias" element={<HierarquiasPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
