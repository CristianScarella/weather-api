import { createClient } from 'redis'

const initConnectionRedisDB = async () => {
  try {
    const client = createClient()
    await client.connect({ host: '127.0.0.1', port: 6379 })
    console.log('Redis Client: connected successfully')

    return client
  } catch (err) {
    console.log('Redis Client error:', err.message)
    throw new Error('Redis Client: An error has occurred')
  }
}

export const getDataFromCache = async (city) => {
  const reply = await client.get(city)

  if (!reply) return

  return JSON.parse(reply)
}

export const setDataCache = async (params) => {
  const { city, dataFromCity } = params
  await client.set(city, JSON.stringify(dataFromCity), { EX: 3600 }) // Ver si está ok esto, debido a que se pasa un argumento mas. Falta capturar el error por las dudas
}

const client = await initConnectionRedisDB()
