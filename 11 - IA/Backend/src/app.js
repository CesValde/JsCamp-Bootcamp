process.loadEnvFile()
import express from "express"
import { jobsRouter } from "./routes/jobs.js"
import { corsMiddleware } from "./middleware/cors.js"
import { DEFAULTS } from "./config.js"
import { aiRouter } from "./routes/ai.js"

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

// toma la verdadera IP del cliente cuando se está detrás de un proxy (como en producción con servicios como Heroku o Vercel)
app.set("trust proxy", 1)

app.use(corsMiddleware())
app.use(express.json())

app.use("/jobs", jobsRouter)
app.use("/ai", aiRouter)

if (process.env.NODE_ENV !== "production") {
   app.listen(PORT, () => {
      console.log(`Servidor levantado en http://localhost:${PORT}`)
   })
}

export default app
