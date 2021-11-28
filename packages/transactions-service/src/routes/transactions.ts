import express from 'express'

const transactionsRouter = express.Router()

const transactions = [
  {
    id: 1,
    type: 'incoming',
  },
  {
    id: 2,
    type: 'outcoming',
  },
]

transactionsRouter.get('/transactions', (_, res) => res.send(transactions))
transactionsRouter.post('/transactions', (req, res) => {
  transactions.push({
    id: transactions.length + 1,
    type: req.body.type || 'incoming',
  })

  res.send(transactions)
})

export default transactionsRouter
