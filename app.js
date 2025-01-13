import express from 'express'
import { routerWeather } from './routes/weather.js'
import errorHandler from './middlewares/errorHandler.js'

export const app = express()

app.use('/weather', routerWeather)

app.disable('x-powered-by')
app.use(errorHandler)
