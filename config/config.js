import 'dotenv/config'
import { createClient } from 'redis'
import { CONFIG } from './envConfig.js'

const client = createClient({
  socket: {
    host: CONFIG.redisHost,
    port: CONFIG.redisPort,
    reconnectStrategy: (retries) => {
      console.warn(`Redis client reconnecting... Attempt #${retries}`)
      if (retries > 10) {
        console.error('Redis client failed to reconnect after 10 attempts.')
        return new Error('Redis: Reconnection limit exceeded.')
      }
      return retries * 200
    }
  }
})

client.on('error', (err) => {
  console.error('Redis Error:', err.message)
})

client.on('connect', () => {
  console.log('Redis connected successfully.')
})

client.on('end', () => {
  console.error('Redis connection closed.')
})

await client.connect()

export { client }
