import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {
  authMiddleware,
  errorMiddleware,
  database,
  configSession,
} from '@mds/common'
import authRouter from './routes/auth'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    const user = database.find(
      (u) => u.email === username && u.password === password
    )

    if (user) {
      return done(null, {
        id: user.id,
        email: user.email,
      })
    }

    return done(null, false)
  })
)

passport.serializeUser((user, done) => {
  done(null, user)
})

configSession(app, passport)

app.use(authRouter)

app.use(authMiddleware)

app.get('/me', (req, res) => {
  res.send(req.user)
})

app.use(errorMiddleware)

app.listen(process.env.port || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Application start ons port 3000!')
})
