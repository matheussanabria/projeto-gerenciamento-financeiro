require("dotenv").config();

const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors'); // Importando o pacote CORS


// Importando as rotas
const authRoutes = require("./routes/authRoutes");
const transacoesRoutes = require('./routes/transacoes');
const remetentesRoutes = require('./routes/remetentes');
const metodosPagamentoRoutes = require('./routes/metodosPagamento');
const formasPagamentoRoutes = require('./routes/formasPagamento');
const formasParcelamentoRoutes = require('./routes/formasParcelamentos');
const contasRoutes = require('./routes/contasRoute');
const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const classesRoutes = require('./routes/classes');
const subclassesRoutes = require('./routes/subclasses');
const hierarquiasRoutes = require('./routes/hierarquiasRoutes');



// Importando o middleware de tratamento de erros
const errorHandler = require('./config/errorHandling'); // Deve ser uma função

// Usando Helmet para segurança
app.use(helmet());

// Usando CORS para permitir    requisições de outros domínios
app.use(cors()); // Permitir requisições de qualquer origem

// Middleware para interpretar JSON
app.use(express.json());

// Definindo as rotas
// Definir rotas para transações
app.use("/auth", authRoutes);

app.use('/transacoes', transacoesRoutes);
app.use('/remetentes', remetentesRoutes);
app.use('/metodos-pagamento', metodosPagamentoRoutes);
app.use('/formas-pagamento', formasPagamentoRoutes);
app.use('/formas-parcelamento', formasParcelamentoRoutes)
app.use('/contas', contasRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/subcategorias', subcategoriasRoutes);
app.use('/classes', classesRoutes);
app.use('/subclasses', subclassesRoutes);
app.use('/api', hierarquiasRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);  // Middleware deve ser uma função

// Definindo a porta do servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`api para transacoes http://localhost:${PORT}/transacoes`);
    console.log(`api para remetentes http://localhost:${PORT}/remetentes`);
    console.log(`api para metodos de pagamento http://localhost:${PORT}/metodos-pagamento`);
    console.log(`api para formas de pagamento http://localhost:${PORT}/formas-pagamento`);
    console.log(`api para formas de parcelamento http://localhost:${PORT}/formas-parcelamento`);
    console.log(`api para contas http://localhost:${PORT}/contas`);
    console.log(`api para categorias http://localhost:${PORT}/categorias`);
    console.log(`api para subcategorias http://localhost:${PORT}/subcategorias`);
    console.log(`api para classes http://localhost:${PORT}/classes`);
    console.log(`api para subclasses http://localhost:${PORT}/subclasses`);
    console.log(`Server running on http://localhost:${PORT}`);
});