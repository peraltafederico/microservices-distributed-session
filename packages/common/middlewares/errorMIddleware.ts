export const errorMiddleware = (err, _, res, next) => {
  if (err.status === 401) {
    res.status(err.status).send({
      errorMessage: 'Unauthorized',
    })
  }

  res.status(500).send({
    errorMessage: ':(',
  })
}
