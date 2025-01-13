import { getDataFromCache, setDataCache } from '../checkCache.js'
import { getWeatherData } from '../services/weatherService.js'

export const getWeatherByCity = async (req, res, next) => {
  const { city } = req.params

  if (!city) return res.status(404).json({ error: 'City parameter is required.' })

  try {
    const cachedData = await getDataFromCache(city)
    if (cachedData) return res.json(cachedData)

    const weatherData = await getWeatherData(city)
    await setDataCache({ city, dataFromCity: weatherData })

    res.status(200).json(weatherData)
  } catch (error) {
    next(error)
  }
}
