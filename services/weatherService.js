import { config } from '../config/config.js'

export const getWeatherData = async (city) => {
  const url = `${config.apiBaseUrl}/${city}?unitGroup=metric&key=${config.weatherApiKey}&contentType=json`

  const response = await fetch(url)
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`)
  return await response.json()
}
