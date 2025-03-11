import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiDollarSign, FiUsers, FiBarChart2, FiSettings } from "react-icons/fi"; // Ícones

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={`sidebar-container ${isOpen ? "expanded" : ""}`}>
      {/* Barra lateral fixa com ícones */}
      <div className="icon-bar">
          <button className="menu-button" onClick={toggleSidebar}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        <nav className="page-icons">
          <NavLink to="/" activeClassName="active">
            <FiHome size={24} />
          </NavLink>
          <NavLink to="/transacoes" activeClassName="active">
            <FiDollarSign size={24} />
          </NavLink>
          <NavLink to="/remetentes" activeClassName="active">
            <FiUsers size={24} />
          </NavLink>
          <NavLink to="/reports" activeClassName="active">
            <FiBarChart2 size={24} />
          </NavLink>
          <NavLink to="/settings" activeClassName="active">
            <FiSettings size={24} />
          </NavLink>
        </nav>
      </div>

      {/* Sidebar expansível */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="app-title">
          <h2>FinanceApp</h2>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active" onClick={toggleSidebar}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/transacoes" activeClassName="active" onClick={toggleSidebar}>
                Transações
              </NavLink>
            </li>
            <li>
              <NavLink to="/remetentes" activeClassName="active" onClick={toggleSidebar}>
                Remetentes
              </NavLink>
            </li>
            <li>
              <NavLink to="/hierarquias" activeClassName="active" onClick={toggleSidebar}>
                Hierarquias
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" activeClassName="active" onClick={toggleSidebar}>
                Relatórios
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" activeClassName="active" onClick={toggleSidebar}>
                Configurações
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

        {/* Estilos CSS aplicados diretamente ao componente */}
      <style jsx>{`
       /* Container da Sidebar */
      .sidebar-container {
        display: flex;
        align-items: stretch;
      }
      
      .app-title{
        padding: 1em;
        max-height: 92px;
      }

      /* Barra lateral fixa com ícones */
      .icon-bar {
        z-index: 10;
        display: flex;
        flex-direction: column;
        width: 60px;
        height: 100vh;
        background-color: #066efd;
        align-items: center;
        position: fixed;
        left: 0;
      }

      nav.page-icons{
        display: flex;
        flex-direction: column;

      }
      .icon-bar a {
        color: #ecf0f1;
        text-decoration: none;
        font-size: 24px;
        transition: 0.3s;
        padding: 0.5rem;
      }

      .icon-bar a:hover {
        color: #ffffff;
      }

      /* Botão do menu hambúrguer */
      .menu-button {
        background: none;
        border: none;
        color: #ecf0f1;
        font-size: 24px;
        cursor: pointer;
        height: 70px;
      }

      /* Sidebar expansível */
      .sidebar {
        z-index: 9;
        width: 0;
        height: 100vh;
        background-color: #066efd;
        color: #ecf0f1;
        padding: 0 1rem;
        position: fixed;
        overflow: hidden;
        transition: width 0.3s ease-in-out;
      }

      /* Sidebar aberta */
      .sidebar.open {
        width: 250px;
        left: 60px;
      }

      /* Estilização da lista de navegação */
      .sidebar nav ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
      }

      .sidebar nav ul li {
            padding: 17px 0 8px 0;
      }

      .sidebar nav ul li a {
        color: #ecf0f1;
        text-decoration: none;
        font-size: 18px;
        display: flex;
        align-items: center;
      }

      .sidebar nav ul li a span {
        margin-left: 10px;
      }

      /* Links ativos */
      .sidebar nav ul li a.active {
        font-weight: bold;
      }

      `}</style>
      </div>
    </>
  );
};

export default Sidebar;
