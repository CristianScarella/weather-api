import { app } from './app.js'
import { CONFIG } from './config/envConfig.js'

const PORT = CONFIG.port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
