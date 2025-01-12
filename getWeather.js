import 'dotenv/config'

export const getWeatherData = async (city) => {
  const API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
  const URL = `${API_URL}${city}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`
  const response = await fetch(URL, { method: 'GET' })

  console.log(`Successful call to the API (city: ${city})`)

  return await response.json()
}
