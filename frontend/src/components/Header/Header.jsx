// Header.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Mapeia as rotas para nomes mais amigáveis
  const pageTitles = {
    '/': 'Home',
    '/remetentes': 'Remetentes',
    '/transacoes': 'Transações',
    '/hierarquias': 'Hierarquias',
    '/configuracoes': 'Configurações'
  };

  const pageTitle = pageTitles[location.pathname] || 'Página';

  return (
    <header className="header">
      <h1>{pageTitle}</h1>
      <style jsx>{`
        .header {
          background: #066efd;
          color: white;
          padding: 0.5em;
          text-align: center;
          font-size: 1.5em;
        }
      `}</style>
    </header>
  );
};

export default Header;