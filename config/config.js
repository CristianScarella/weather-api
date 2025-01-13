import 'dotenv/config'
import { createClient } from 'redis'

const client = createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
    reconnectStrategy: (retries) => {
      console.warn(`Redis client reconnecting... Attempt #${retries}`)
      if (retries > 10) {
        console.error('Redis client failed to reconnect after 10 attempts.')
        return new Error('Redis: Reconnection limit exceeded.')
      }
      return Math.min(retries * 100, 3000) // Tiempo entre intentos
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

export const config = {
  port: process.env.PORT || 3000,
  weatherApiKey: process.env.WEATHER_API_KEY,
  apiBaseUrl: process.env.WEATHER_URL,
  redisHost: process.env.REDIS_HOST || '127.0.0.1',
  redisPort: process.env.REDIS_PORT || 6379
}
