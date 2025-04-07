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
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Transacoes from "./pages/TransactionsPage";
// import Contas from "./pages/Contas";
// import Cartoes from "./pages/Cartoes";
// import Pagamentos from "./pages/Pagamentos";
import Remetentes from "./pages/Remetentes";
import Hierarquias from "./pages/Hierarquias";
// import Relatorios from "./pages/Relatorios"; 
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "content-expanded" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transacoes" element={<Transacoes />} />
            {/* <Route path="/contas" element={<Contas />} /> */}
            {/* <Route path="/cartoes" element={<Cartoes />} /> */}
            {/* <Route path="/pagamentos" element={<Pagamentos />} /> */}
            <Route path="/remetentes" element={<Remetentes />} />
            <Route path="/hierarquias" element={<Hierarquias />} />
            {/* <Route path="/relatorios" element={<Relatorios />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
