const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors'); // Importando o pacote CORS


// Importando as rotas
const transacoesRoutes = require('./routes/transacoes');
const remetentesRoutes = require('./routes/remetentes');
const metodosPagamentoRoutes = require('./routes/metodosPagamento');
const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const classesRoutes = require('./routes/classes');
const subclassesRoutes = require('./routes/subclasses');

// Importando o middleware de tratamento de erros
const errorHandler = require('./utils/errorHandling'); // Deve ser uma função

// Usando Helmet para segurança
app.use(helmet());

// Usando CORS para permitir requisições de outros domínios
app.use(cors()); // Permitir requisições de qualquer origem

// Middleware para interpretar JSON
app.use(express.json());

// Definindo as rotas
// Definir rotas para transações
app.use('/transacoes', transacoesRoutes);
app.use('/remetentes', remetentesRoutes);
app.use('/metodos-pagamento', metodosPagamentoRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/subcategorias', subcategoriasRoutes);
app.use('/classes', classesRoutes);
app.use('/subclasses', subclassesRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);  // Middleware deve ser uma função

// Definindo a porta do servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});