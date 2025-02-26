
Sistema financeiro para gestão de receita 
react-router-dom


# Sistema de Gerenciamento Financeiro Desenvolvido em PERN

## Visão Geral
Este projeto é um sistema de gerenciamento financeiro que permite registrar e acompanhar receitas e despesas de forma simples e eficiente.

## Funcionalidades Principais
- Cadastro de receitas e despesas.
- Visualização de todas as transações em uma única tela.
- Relatórios mensais e categorização de transações.

## Tecnologias Utilizadas
- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **Ferramentas**: ESLint, Prettier, Swagger

## Como Usar Esta Documentação
- **Instalação**: Veja como configurar o projeto localmente em [instalacao.md](instalacao.md).
- **Uso**: Aprenda a usar o sistema em [uso.md](uso.md).
- **Desenvolvimento**: Saiba como contribuir para o projeto em [desenvolvimento.md](desenvolvimento.md).
- **API**: Consulte a documentação da API em [api.md](api.md).

## 1. Instalação
  Siga os passos abaixo para configurar o projeto em sua máquina.

## 2. Pré-requisitos
  - Node.js (v18 ou superior)
  - PostgreSQL (v12 ou superior)
  - Git

## 3. Passo a Passo
  ### 3.1. Clone o repositório:
  - `git clone https://github.com/seu-usuario/sistema-financeiro.git`
  - `cd sistema-financeiro`

  ### 3.2 Instale as dependências:
  -  `npm install`

  ### 3.3 Configure o banco de dados**:
  - Crie um banco de dados no PostgreSQL.
  - Configure as variáveis de ambiente no arquivo .env:
    `/.env`
      `DB_HOST=localhost`
      `DB_PORT=5432`
      `DB_USER=seu_usuario`
      `DB_PASSWORD=sua_senha`
      `DB_NAME=sistema_financeiro`

  ### 3.4 Execute as migrações:
  - npx knex migrate:latest 

  ### 3.5 Inicie o servidor:
  - npm start

  ### 3.6 Acesse o sistema:
  - Frontend: `http://localhost:3000`
  - Backend: `http://localhost:5000`







### 8. Hospedando a Documentação
  - Você pode hospedar a documentação no GitHub Pages ou usando ferramentas como MkDocs ou Read the Docs. Aqui está um exemplo usando MkDocs:

  - Instale o MkDocs:
    `pip install mkdocs`

  - Crie um novo projeto:
    `mkdocs new my-docs`
  
  - Adicione seus arquivos Markdown na pasta docs/.

  - Gere o site:
    `mkdocs build`
  
  - Visualize localmente:
    `mkdocs serve`

  - Publique no GitHub Pages:
    `mkdocs gh-deploy`

    sistema-financeiro/
├── frontend/                  # Pasta do Frontend (React)
│   ├── public/                # Arquivos estáticos (HTML, imagens)
│   ├── src/                   # Código-fonte do React
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas do sistema
│   │   ├── services/          # Serviços para chamadas à API
│   │   ├── App.tsx            # Componente principal
│   │   └── index.tsx          # Ponto de entrada
│   └── package.json           # Dependências do frontend
│
├── backend/                   # Pasta do Backend (Node.js)
│   ├── src/                   # Código-fonte do backend
│   │   ├── controllers/       # Lógica dos endpoints da API
│   │   ├── models/            # Definições dos modelos de dados
│   │   ├── routes/            # Definição das rotas da API
│   │   ├── services/          # Lógica de negócio
│   │   ├── utils/             # Utilitários (validações, helpers)
│   │   └── index.ts           # Ponto de entrada
│   ├── knexfile.ts            # Configuração do Knex (migrações)
│   ├── migrations/            # Migrações do banco de dados
│   └── package.json           # Dependências do backend
│
├── .env                       # Variáveis de ambiente
├── .gitignore                 # Arquivos ignorados pelo Git
├── docs/
    └── README.md                  # Documentação principal
    └── instalacao.md
    └── uso.md
    └── desenvolvimento.md
    └── api.md
    └── faq.md


    Usuário → Frontend (React) → Backend (Node.js/Express) → Banco de Dados (PostgreSQL)