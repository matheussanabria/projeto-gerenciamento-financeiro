# Arquitetura do Sistema

## Diagrama de Arquitetura
O sistema é composto por três componentes principais:
1. **Frontend**: Interface do usuário, construída com React e TypeScript.
2. **Backend**: API, construída com Node.js e Express.
3. **Banco de Dados**: PostgreSQL, onde os dados são armazenados.

### Diagrama
+-------------------+ +-------------------+ +-------------------+
| | | | | |
| Frontend | <---> | Backend | <---> | Banco de Dados |
| (React) | HTTP | (Node.js/Express)| SQL | (PostgreSQL) |
| | | | | |
+-------------------+ +-------------------+ +-------------------+

## Fluxo de Dados
### Adicionar uma Transação
1. O usuário preenche o formulário no frontend e clica em "Salvar".
2. O frontend envia uma requisição HTTP POST para o backend.
3. O backend valida os dados e insere a transação no banco de dados.
4. O banco de dados retorna uma confirmação para o backend.
5. O backend envia uma resposta de sucesso para o frontend.
6. O frontend exibe uma mensagem de sucesso e atualiza a lista de transações.

### Adicionar uma Conta
1. O usuário preenche o formulário no frontend e clica em "Salvar".
2. O frontend envia uma requisição HTTP POST para o backend.
3. O backend valida os dados e insere a conta no banco de dados.
4. O banco de dados retorna uma confirmação para o backend.
5. O backend envia uma resposta de sucesso para o frontend.
6. O frontend exibe uma mensagem de sucesso e atualiza a lista de contas.

### Adicionar um Remetente
1. O usuário preenche o formulário no frontend e clica em "Salvar".
2. O frontend envia uma requisição HTTP POST para o backend.
3. O backend valida os dados e insere o remetente no banco de dados.
4. O banco de dados retorna uma confirmação para o backend.
5. O backend envia uma resposta de sucesso para o frontend.
6. O frontend exibe uma mensagem de sucesso e atualiza a lista de remetentes.

### Editar um Remetente
1. O usuário edita o formulário no frontend e clica em "Salvar".
2. O frontend envia uma requisição HTTP PUT para o backend.
3. O backend valida os dados e atualiza o remetente no banco de dados.
4. O banco de dados retorna uma confirmação para o backend.
5. O backend envia uma resposta de sucesso para o frontend.
6. O frontend exibe uma mensagem de sucesso e atualiza a lista de remetentes.

### Exluir um Remetente
1. O usuário clica sobre o botar exluir no frontend.
2. O frontend envia uma requisição HTTP DELETE para o backend.
3. O backend valida os dados e remove o remetente no banco de dados.
4. O banco de dados retorna uma confirmação para o backend.
5. O backend envia uma resposta de sucesso para o frontend.
6. O frontend exibe uma mensagem de sucesso e atualiza a lista de remetentes.

## Estrutura de Pastas
### Frontend
frontend/
├── public/ # Arquivos estáticos
├── src/ # Código-fonte do React
│ ├── components/ # Componentes reutilizáveis
│ ├── pages/ # Páginas do sistema
│ ├── services/ # Serviços para chamadas à API
│ ├── App.tsx # Componente principal
│ └── index.tsx # Ponto de entrada
└── package.json # Dependências do frontend


### Backend
backend/
├── src/ # Código-fonte do backend
│ ├── controllers/ # Lógica dos endpoints da API
│ ├── models/ # Definições dos modelos de dados
│ ├── routes/ # Definição das rotas da API
│ ├── services/ # Lógica de negócio
│ ├── utils/ # Utilitários
│ └── index.ts # Ponto de entrada
├── knexfile.ts # Configuração do Knex
├── migrations/ # Migrações do banco de dados
└── package.json # Dependências do backend

