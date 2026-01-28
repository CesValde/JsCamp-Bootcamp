// process.loadEnvFile() // cargar las var entorno del .env
import dotenv from "dotenv"
dotenv.config()

import { test } from "node:test"
import assert from "assert"
import { Stagehand } from "@browserbasehq/stagehand"

// console.log(process.env.OPENAI_API_KEY)

test("comprar entradas jsconf", async () => {
   const stagehand = new Stagehand({
      env: "LOCAL",
      model: "groq-llama-3.3-70b-versatile"
   })

   await stagehand.init()

   const [page] = stagehand.context.pages()

   await page.goto("http://jsconf.es")

   // lo que quiero que haga
   // 3. AI free GROQ
   await stagehand.act("Clicar en el botón 'Comprar entradas'")
   await stagehand.act("Añadir dos entradas de tipo 'Entrada General'")

   const { extraction } = await stagehand.extract(
      "Obtener el Total del carrito"
   )

   console.log("Total extraído:", extraction)
   assert.strictEqual(extraction, " €287.98")

   assert.ok(extraction)

   await stagehand.close()
})

// 1:
// Agente de IA --> sale caro
// await agent.execute("Add two tickets 'Entrada General' to the cart ")

// 2: Stagehand manual
/*
   await stagehand.act("Clicar en el boton de 'Comprar entradas'")

   await stagehand.act("Click en el '+' al lado de 'Entrada General' para añadir un ticket")
   await stagehand.act("Click en el '+' al lado de 'Entrada General' para añadir un segundo ticket")

   // extraer la informacion
   const { extraction } = await stagehand.extract("Obten el subtotal de la pagina")
   console.log('Subtotal extraido: ', extraction)

   assert.strictEqual(extraction, ' €287.98') 
*/
