import { client } from './config/config.js'

export const getDataFromCache = async (city) => {
  try {
    const reply = await client.get(city)

    if (!reply) return
    return JSON.parse(reply)
  } catch (error) {
    console.error('Redis Error in getDataFromCache:', error.message)
    throw new Error('Redis service is unavailable.')
  }
}

export const setDataCache = async (params) => {
  const { city, dataFromCity } = params
  try {
    await client.set(city, JSON.stringify(dataFromCity), { EX: 3600 }) // Ver si está ok esto, debido a que se pasa un argumento mas. Falta capturar el error por las dudas
  } catch (error) {
    console.error('Redis Error in setDataCache:', error.message)
    throw new Error('Failed to save data to Redis.')
  }
}
