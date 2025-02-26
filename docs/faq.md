
### 7. FAQ e Solução de Problemas (`faq.md`)
  - Aqui, você lista perguntas frequentes e soluções para problemas comuns.

  # FAQ

  ## Como resolver erros de conexão com o banco de dados?
    - Verifique se o PostgreSQL está rodando.
    - Confira as variáveis de ambiente no arquivo `.env`.

  ## Como adicionar uma nova categoria de transação?
    - No banco de dados, insira uma nova linha na tabela `categorias`.
    - Reinicie o servidor.

  ## O que fazer se os testes falharem?
    - Verifique se todas as dependências estão instaladas.
    - Execute `npm install` e tente novamente.
