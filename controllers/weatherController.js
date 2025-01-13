import { getDataFromCache, setDataCache } from '../services/cacheService.js'
import { getWeatherData } from '../services/weatherService.js'

export const getWeatherByCity = async (req, res, next) => {
  const { city } = req.params

  if (!city) return res.status(404).json({ error: 'City parameter is required.' })

  try {
    const cachedData = await getCachedWeatherData(city)
    if (cachedData) {
      return res.status(200).json(cachedData)
    }

    const weatherData = await getCityWhetherFromAPI(city)

    await cacheWeatherData(city, weatherData)

    res.status(200).json(weatherData)
  } catch (error) {
    next(error)
  }
}

const getCachedWeatherData = async (city) => {
  try {
    const cachedData = await getDataFromCache(city)
    if (cachedData) {
      console.log(`Cache hit for city: ${city}`)
    } else {
      console.log(`There is no city: ${city} in cache`)
    }
    return cachedData
  } catch (error) {
    console.warn('Redis is down, the API call is being made')
  }
}

const getCityWhetherFromAPI = async (city) => {
  try {
    return await getWeatherData(city)
  } catch (error) {
    console.error('Error while fetching the API')
    throw new Error('Failed to fetch data from API')
  }
}

const cacheWeatherData = async (city, weatherData) => {
  try {
    await setDataCache({ city, dataFromCity: weatherData })
  } catch (error) {
    console.log('Redis is down, data is not cached')
  }
}
