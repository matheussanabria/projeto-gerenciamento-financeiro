import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>FinanceApp</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/transacoes" activeClassName="active">
              Transações
            </NavLink>
          </li>
          <li>
            <NavLink to="/contas" activeClassName="active">
              Contas
            </NavLink>
          </li>
          <li>
            <NavLink to="/remetentes" activeClassName="active">
              Remetentes
            </NavLink>
          </li>
          <li>
            <NavLink to="/servicos" activeClassName="active">
              Serviços
            </NavLink>
          </li>
          <li>
            <NavLink to="/estoque" activeClassName="active">
              Estoque
            </NavLink>
          </li>
          <li>
            <NavLink to="/movimentacao-estoque" activeClassName="active">
              Movimentação estoque
            </NavLink>
          </li>
          <li>
            <NavLink to="/caixa-comandas" activeClassName="active">
              Caixa/Comandas
            </NavLink>
          </li>
          <li>
            <NavLink to="/pagamentos" activeClassName="active">
              Pagamentos
            </NavLink>
          </li>
          <li>
            <NavLink to="/hierarquias" activeClassName="active">
              Hierarquias
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active">
              Relatórios
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active">
              Configurações
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
