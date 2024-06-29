import pg from 'pg'
import config from '../database/configDB.js'

const { Client } = pg
const client = new Client(config)

async function addProva(values) {
  try {
    await client.connect();
    const query = `INSERT INTO provas (orgao, banca, dt_inscricao, dt_pgto, dt_prova, f_inscrito, f_pago, valor, f_realizada)
      VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;`
    const result = await client.query(query, values)
    return result.rows[0]
  
  } catch (err){
    console.log('Não foi possível inserir os dados', err)
  
  } finally {
    await client.end()
  }
  
}

async function getProvas() {
  try {
    await client.connect()
    const query = `SELECT * FROM provas;`
    const result = await client.query(query)
    return result.rows
  
  } catch (err) {
    console.log('Não foi possível recuperar os dados', err)
  
  } finally {
    await client.end()
  }
}

async function getProvaByID(id) {
  try {
    await client.connect()
    const query = `SELECT * FROM provas where id = $1 RETURNING *;`
    const result = await client.query(query, [id])
    return result
  
  } catch (err) {
    console.log('Não foi possível encontrar os dados', err)
  } finally {
    await client.end()
  }
}

async function updateProva(id, values) {
  try {
    await client.connect()
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
      WHERE id = $1
      RETURNING *;`
    const result = await client.query(query, [id, ...values])
    if(result.rowCount > 0) {
      return result
    } else {
      return {msg: "Nenhuma prova econtrada"}
    }
  
  } catch (err) {
    console.log('Não foi possível atualizar os dados', err)
  
  } finally {
    await client.end()
  }
}

async function deleteProvaByID(id) {
  try {
    await client.connect()
    const query = `DELETE FROM provas where id = $1 RETURNING *;`
    const result = await client.query(query, [id])
    
    if(result.rowCount > 0) {
      return {msg: `Prova deletada com sucesso: ${id}`}
    } else {
      return {msg: "Nenhuma prova econtrada"}
    }
  
  } catch (err) {
    console.log('Não foi possível apagar os dados', err)
  } finally {
    await client.end()
  }
}

export {addProva, getProvaByID, getProvas, updateProva, deleteProvaByID}