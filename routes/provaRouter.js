import express from 'express'
const router = express.Router()
import connect from '../database/configDB.js'

router.post('/adicionarProva', async (req, res) => {
  const prova = req.body
  let values = []
  for(const key in prova) {
    values.push(prova[key])
  }
  console.log('PROVA: ***', req.body)
  console.log('LISTA: ***', values)
  try {
    const client = await connect();
    const query = `INSERT INTO provas (orgao, banca, dt_inscricao, dt_pgto, dt_prova, f_inscrito, f_pago, valor, f_realizada, candidato)
      VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10);`
    
    const result = await client.query(query, values)
    res.status(200).send(`Registro adicionado com sucesso: ${result.rowCount}`)
  
  } catch (err){
    console.log('Não foi possível inserir os dados', err)
  }
})

router.get('/', async (req, res) => {
  try {
    const client = await connect()
    const query = `SELECT * FROM provas;`
    const result = await client.query(query)
    res.status(200).send(result.rows)
  
  } catch (err) {
    console.log('Não foi possível recuperar os dados', err)
  
  } 
})

router.get('/prova/:id', async (req, res) => {
  const { id } = req.params
  try {
    const client = await connect()
    const query = `SELECT * FROM provas where id = $1;`
    const result = await client.query(query, [id])
    res.status(200).send(result.rows)
  
  } catch (err) {
    console.log('Não foi possível encontrar os dados', err)
  } 
})

router.patch('/atualizarProva/:id', async (req, res) => {
    const { id } = req.params
    const prova = req.body

    let values = []

    for(const key in prova ){
      values.push(prova[key])
    }

    try {
      const client = await connect()
      const query = `
        UPDATE provas
          SET orgao = $2,
          banca = $3,
          dt_inscricao = $4,
          dt_pgto = $5,
          dt_prova = $6,
          f_inscrito = $7,
          f_pago = $8,
          valor = $9,
          f_realizada = $10
        WHERE id = $1;`

      const result = await client.query(query, [id, ...values])
      
      if(result.rowCount > 0) {
        res.status(200).send(result.rowCount)
      } else {
        return {msg: "Nenhuma prova econtrada"}
      }
    
    } catch (err) {
      console.log('Não foi possível atualizar a prova', err)
    }
})

router.delete('/apagarProva/:id', async (req, res) => {
  const { id } = req.params

  try {
    const client = await connect()
    const query = `DELETE FROM provas where id = $1;`
    const result = await client.query(query, [id])
    
    if(result) {
      res.status(200).send(`Registro deletado com sucesso: ${result.rowCount}`)
    } else {
      return {msg: "Nenhuma prova econtrada"}
    }
  
  } catch (err) {
    console.log('Não foi possível apagar os dados', err)
  }
})

export default router
