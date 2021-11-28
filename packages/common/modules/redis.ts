import distSession from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'

export const RedisStore = connectRedis(distSession)

export const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
})

redisClient.on('error', function (err) {
  console.log(`Could not establish a connection with redis. ${err}`)
})
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully')
})

export const session = distSession