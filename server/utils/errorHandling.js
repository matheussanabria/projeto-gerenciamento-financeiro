// utils/errorHandling.js

const errorHandler = (err, req, res, next) => {
    // Log do erro no console, incluindo detalhes
    console.error('Error Message:', err.message);
    console.error('Error Stack:', err.stack);

    // Resposta de erro mais informativa
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Algo deu errado!',
            // Adicione mais informações se necessário
            status: err.status || 500
        }
    });
};

module.exports = errorHandler;
