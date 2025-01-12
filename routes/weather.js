import express from 'express'
import { getDataFromCache, setDataCache } from '../checkCache.js'
import { getWeatherData } from '../getWeather.js'

export const routerWeather = express.Router()

routerWeather.get('/:city', async (req, res) => {
  const { city } = req.params

  if (!city) return res.status(404).json({ error: 'No se envió el parametro city' })

  const dataFromCache = await getDataFromCache(city)
  if (dataFromCache) {
    res.json(dataFromCache)
    return
  }

  try {
    const data = await getWeatherData(city)

    await setDataCache({ city, dataFromCity: data })

    res.status(200).json(data)
  } catch (error) {
    console.error('Error al llamar a la API:', error.message)
    res.status(500).json({ error: 'Ocurrio un error inesperado' })
  }
})
