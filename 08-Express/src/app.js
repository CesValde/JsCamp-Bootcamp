import express from "express"
import { jobsRouter } from "./routes/jobs.js"
import { corsMiddleware } from "./middleware/cors.js"
import { DEFAULTS } from "./config.js"

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(corsMiddleware())
app.use(express.json())

app.use("/jobs", jobsRouter)

if (!process.env.NODE_ENV) {
   app.listen(PORT, () => {
      console.log(process.env.NODE_ENV)
      console.log(`Servidor levantado en http://localhost:${PORT}`)
   })
}
console.log(process.env.NODE_ENV)

export default app

// npm run dev:prod
