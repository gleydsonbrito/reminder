import express from 'express'
import bodyParser from 'body-parser'
import useRoutes from './routes/provaRouter.js'

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(useRoutes)

export default app