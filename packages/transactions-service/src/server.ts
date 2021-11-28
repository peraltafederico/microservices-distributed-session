import express from 'express'
import passport from 'passport'
import { authMiddleware, errorMiddleware, configSession } from '@mds/common'
import transactionsRouter from './routes/transactions'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

configSession(app, passport)

app.use(authMiddleware)
app.use(transactionsRouter)
app.use(errorMiddleware)

app.listen(process.env.port || 3001, () => {
  // eslint-disable-next-line no-console
  console.log('Application start ons port 3001!')
})
