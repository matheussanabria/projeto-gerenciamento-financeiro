
// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Meu Projeto. Todos os direitos reservados.</p>
      <style jsx>{`
        .footer {
          background: #333;
          color: white;
          text-align: center;
          padding: 1rem;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
