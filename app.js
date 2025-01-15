import express from 'express'
import { rateLimit } from 'express-rate-limit'
import { routerWeather } from './routes/weather.js'
import errorHandler from './middlewares/errorHandler.js'

export const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use(limiter)

app.use('/weather', routerWeather)

app.disable('x-powered-by')

app.use(errorHandler)
