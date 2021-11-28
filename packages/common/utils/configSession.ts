import { redisClient, RedisStore, session } from '../modules/redis'

export const configSession = (app, passport) => {
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

  app.use(passport.initialize())
  app.use(passport.session())

  passport.deserializeUser((user, done) => {
    done(null, user as Express.User)
  })
}
