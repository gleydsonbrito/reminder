import express from 'express'
const router = express.Router()

import {addProva, getProvaByID, getProvas, updateProva, deleteProvaByID} from '../controller/provaController.js'

router.post('/adicionarProva', async (req, res) => {
  const prova = req.body
  let values = []
  for(const key in prova) {
    values.push(prova[key])
  }
  try {
    const prova = await addProva(values)
    res.status(201).json({msg: `Prova ${prova.id} adicionada com sucesso`})
  } catch (err) {
    res.send('Não foi possível adicionar os dados')
  }
})

router.get('/', async (req, res) => {
  getProvas()
  .then(res => res.json())
  .then(provas => {
    res.status(200).send(provas)
  })
})

export default router