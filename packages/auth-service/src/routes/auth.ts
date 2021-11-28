import passport from 'passport'
import express from 'express'

const authRouter = express.Router()

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error) {
      return next(error)
    }

    if (!user) {
      throw { status: 401 }
    }

    return req.logIn(user, (e) => {
      if (e) {
        return next(e)
      }

      return res.send(user)
    })
  })(req, res, next)
})

export default authRouter
