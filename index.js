import express from 'express'
import { routerWeather } from './routes/weather.js'

const app = express()
const PORT = 3000

app.disable('x-powered-by')

app.use('/weather', routerWeather)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
