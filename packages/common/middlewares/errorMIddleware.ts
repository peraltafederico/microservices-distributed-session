export const errorMiddleware = (err, _, res, __) => {
  if (err.status === 401) {
    res.status(err.status).send({
      errorMessage: 'Unauthorized',
    })

    return
  }

  res.status(500).send({
    errorMessage: ':(',
  })
}
