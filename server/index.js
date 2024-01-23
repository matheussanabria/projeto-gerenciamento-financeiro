const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

//middlewares
app.use(cors());
app.use(express.json())

// Rotas

// app.get('/financial-management', (req, res) => {
//     res.send('acessado com sucesso!')
// })


// inserir item
app.post("/financial-management", async (req, res) => {// app postar no caminho "/todos", func assincrona(par_requisicao, par_resposta) funcao de flecha
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
            data_gregoriana,
            sincronario,
            plasma,
            heptal,
            lua } = req.body;// const { descricao } valor igual ao par_respost chamar corpo

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
            data_gregoriana,
            sincronario,
            plasma,
            heptal,
            lua
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *;
        `

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
            data_gregoriana,
            sincronario,
            plasma,
            heptal,
            lua]// const descricao
        )
        res.json(inserirItem.rows[0]);// par_resposta chamar metodo json em(novoAfazer chamar linhas[indice_0])
    } catch (error){
        // console.error(error.message)
        console.log(error.message)
    }

})

// listar item especifico
app.get("/financial-management/:id", async (req, res) => {
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
app.get("/financial-management", async (req, res) => {
    try {
        const { id } = req.params;
        const listarItens = await pool.query("SELECT * FROM receitabruta")
        res.json(listarItens.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// atualizar item
app.put("/financial-management/:id", async (req, res) => {
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
            data_gregoriana,
            sincronario,
            plasma,
            heptal,
            lua } = req.body// const { descricao } valor igual ao par_respost chamar corpo
        
        const atualizarDados = `
        UPDATE receitabruta SET (
            descricao,
            valor,
            metodo,
            remetente,
            categoria,
            subcategoria,
            classe,
            subclasse,
            data_gregoriana,
            sincronario,
            plasma,
            heptal,
            lua
        ) = ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) WHERE id = $14 ;
        `
        const atualizarItem = await pool.query(atualizarDados, [ 
            descricao,
            valor,
            metodo,
            remetente,
            categoria,
            subcategoria,
            classe,
            subclasse,
            data_gregoriana,
            sincronario,
            plasma,
            heptal,
            lua,
            id
        ])
        res.json("Item atualizado com sucesso!")
    } catch (error) {
        console.log(error.message)
    }
})

// deletar item
app.delete("/financial-management/:id", async (req, res) => {
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
app.listen(5000, () => {
    console.log('O servidor está rodando em http://localhost:5000/financial-management')

})