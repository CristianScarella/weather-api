import { CONFIG } from '../config/envConfig.js'

export const getWeatherData = async (city) => {
  const url = `${CONFIG.apiBaseUrl}/${city}?unitGroup=metric&key=${CONFIG.weatherApiKey}&contentType=json`

  const response = await fetch(url)
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`)
  return await response.json()
}
