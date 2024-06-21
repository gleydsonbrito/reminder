import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import useRoutes from './routes/provaRouter.js'

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(cors)
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(useRoutes)

export default app