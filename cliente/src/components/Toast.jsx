import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    console.log('Toast renderizado com mensagem:', message); // Verifique no console
    
    useEffect(() => {
        const timer = setTimeout(() => {
          console.log('Fechando toast automaticamente');
          onClose();
        }, 3000);
        
        return () => {
          console.log('Limpeza do timer do toast');
          clearTimeout(timer);
        };
      }, [onClose]);
    return (
      <div className={`toast ${type}`} style={{ backgroundColor: 'red' }}> {/* Cor fixa para teste */}
        {message}
        <style jsx>{`
          .toast {
            position: fixed;
            bottom: 20px;  /* Teste posição inferior */
            left: 50%;
            transform: translateX(-50%);
            /* ... outros estilos */
            }
            padding: 15px 25px;
            border-radius: 4px;
            color: green;
            font-weight: 500;
            z-index: 99999; /* Valor extremamente alto para teste */
            border: 2px solid yellow; /* Borda visível para teste */
          }
        `}</style>
      </div>
    );
  };

  export default React.memo(Toast); // Adicione memoização