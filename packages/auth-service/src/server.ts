import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {
  authMiddleware,
  errorMiddleware,
  redisClient,
  RedisStore,
  session,
  database,
} from '@mds/common'
import authRouter from './routes/auth'

declare global {
  namespace Express {
    export interface User {
      id: string
      email: string
    }
  }
}

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    },
  })
)

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

passport.deserializeUser((user, done) => {
  done(null, user as Express.User)
})

app.use(passport.initialize())
app.use(passport.session())

app.use(authRouter)

app.use(authMiddleware)

app.get('/me', (req, res) => {
  res.send(req.user)
})

app.use(errorMiddleware)

// @ts-ignore
app.listen(process.env.port || 3000, () => {
  console.log('Application start ons port 3000!')
})
