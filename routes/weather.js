import express from 'express'
import { getWeatherByCity } from '../controllers/weatherController.js'

export const routerWeather = express.Router()

routerWeather.get('/:city', getWeatherByCity)
