## 5. Documentando a API (`api.md`)
  - Aqui, você documenta os endpoints da API.

  # Documentação da API

  ## Endpoints

  ### Listar Transações
  - **Método**: `GET`
  - **URL**: `/api/transacoes`
  - **Exemplo de Resposta**:
      [
        {
          `"id": 1`,
          `"descricao": "Salário"`,
          `"valor": 3000`,
          `"remetente": "Matheus Sanabria Rodrigues"`,
          "formaPag": "Pix",
          "parcelamento: "Á vista",
          "conta" "Salão"
          B
          `"data": "2023-10-01"`,
          `"categoria": "Receita"`
        }
      ]
    

  ### Criar Transação
    - **Método:** `POST`
    - **URL:** `/api/transacoes`
    - **Corpo da Requisição**:
      {
       ` "descricao": "Aluguel"`,
        `"valor": 1200`,
        `"data": "2023-10-05"`,
        `"categoria": "Despesa"`
      }
    - **Exemplo de Resposta**:
      {
        "id": 2,
       ` "descricao": "Aluguel"`,
        `"valor": 1200`,
        `"data": "2023-10-05"`,
        `"categoria": "Despesa"`
      }

  ### Atualizar Transação
    - **Método**: `PUT`
    - **URL**: `/api/transacoes/{id}`
    - **Corpo da Requisição**:
      {
        `"descricao": "Aluguel Atualizado"`,
        `"valor": 1300`
      }

  ### Excluir Transação
    -  **Método**: `DELETE`
    - **URL**: `/api/transacoes/{id}`