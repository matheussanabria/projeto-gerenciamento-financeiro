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
