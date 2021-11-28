export const authMiddleware = (req, _, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  throw { status: 401 }
}
