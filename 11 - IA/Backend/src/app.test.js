import { test, describe, before, after } from "node:test"
import assert, { rejects } from "node:assert"
import app from "./app.js"

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

// antes de todos los test andes de levantar el servidor
before(async () => {
   return new Promise((resolve, reject) => {
      server = app.listen(PORT, () => resolve())
      server.on("error", reject)
   })
})

// despues de todos los tests, se ejecuta una vez, para cerrar el servidor
after(async () => {
   return new Promise((resolve, reject) => {
      server.close((err) => {
         if (err) return reject(err)
         resolve()
      })
   })
})

describe("GET /jobs", () => {
   test("Debe responder con 200 y un array de trabajos", async () => {
      const response = await fetch(`${BASE_URL}/jobs`)
      assert.strictEqual(response.status, 200)

      const json = await response.json()
      assert.ok(Array.isArray(json.data), "la respuesta debe ser un array")
   })

   test("debe filtrar los trabajos por tecnologia", async () => {
      const tech = "react"
      const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
      assert.strictEqual(response.status, 200)

      const json = await response.json()
      assert.ok(
         json.data.every(job => job.data.technology.includes(tech)),
         `todos los trabajos deben incluir la tecnologia ${tech}`
      )
   })
})

//
// NODE_ENV=test node --test app.test.js
// npm test
