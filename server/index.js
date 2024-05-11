const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

//middlewares
app.use(cors());
app.use(express.json())


// Rotas

// app.get('/gerenciador-financeiro', (req, res) => {
//     res.send('acessado com sucesso!')
// })


// inserir item
app.post("/gerenciador-financeiro", async (req, res) => {// app postar no caminho "/todos", func assincrona(par_requisicao, par_resposta) funcao de flecha
    try {// tente 
        const { 
            descricao,
            valor,
            metodo,
            remetente,
            categoria,
            subcategoria,
            classe,
            subclasse,
            dataGregoriana,
            /*
            sincronario,
            plasma,
            heptal,
            lua*/
         } = req.body;// const { descricao } valor igual ao par_respost chamar corpo

         const inserirDados = `
         INSERT INTO receitabruta (
             descricao,
             valor,
             metodo,
             remetente,
             categoria,
             subcategoria,
             classe,
             subclasse,
             dataGregoriana
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
     `;
     

        // const novoAfazer = aguarde consulta de pool("INSERIR EM afazer (tabela_descricao) VALORES($1) RETORNANDO *")
        const inserirItem = await pool.query(inserirDados, [
            descricao,
            valor,
            metodo,
            remetente,
            categoria,
            subcategoria,
            classe,
            subclasse,
            dataGregoriana
            /*  
            sincronario,
            plasma,
            heptal,
            lua
            */
        ]// const inserirItem
        )
        res.json(inserirItem.rows[0]);// par_resposta chamar metodo json em(novoAfazer chamar linhas[indice_0])
    } catch (error){
        // console.error(error.message)
        console.log(error.message)
    }

})

// listar item especifico
app.get("/gerenciador-financeiro/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listarItem = await pool.query("SELECT * FROM receitabruta WHERE id = $1", [id])
        res.json(listarItem.rows[0])
        res.json("Item criado com sucesso!")

    } catch (error) {
        console.log(error.message)
    }
})

// listar todos os itens
app.get("/gerenciador-financeiro", async (req, res) => {
    try {
        const { id } = req.params;
        const listarItens = await pool.query("SELECT * FROM receitabruta")
        res.json(listarItens.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// atualizar item
app.put("/gerenciador-financeiro/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            descricao,
            valor,
            metodo,
            remetente,
            categoria,
            subcategoria,
            classe,
            subclasse,
            dataGregoriana
            /*
            sincronario,
            plasma,
            heptal,
            lua
        */ } = req.body// const { descricao } valor igual ao par_respost chamar corpo
        
        const atualizarDados = `
        UPDATE receitabruta SET
            descricao = $1,
            valor = $2,
            metodo = $3,
            remetente = $4,
            categoria = $5,
            subcategoria = $6,
            classe = $7,
            subclasse = $8,
            dataGregoriana = $9
        WHERE id = $10;
    `;
    
        const atualizarItem = await pool.query(atualizarDados, [ 
            descricao,
            valor,
            metodo,
            remetente,
            categoria,
            subcategoria,
            classe,
            subclasse,
            dataGregoriana,
            /*
            sincronario,
            plasma,
            heptal,
            lua,
            */
            id
        ])
        res.json("Item atualizado com sucesso!")
    } catch (error) {
        console.log(error.message)
    }
})

// deletar item
app.delete("/gerenciador-financeiro/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletarDado = `
            DELETE FROM receitabruta WHERE id = $1;
        `;
        const deletarItem = await pool.query(deletarDado, [id])
        res.json("Item deletado com sucesso!")
    } catch (error) {
        
    }
})
app.listen(5001, () => {
    console.log('O servidor está rodando em http://localhost:5001/gerenciador-financeiro/')
})