import distSession from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'

export const RedisStore = connectRedis(distSession)

export const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
})

redisClient.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Could not establish a connection with redis. ${err}`)
})

redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to redis successfully')
})

export const session = distSession
