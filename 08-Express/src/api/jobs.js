import fs from "fs"

export default function handler(req, res) {
   try {
      const filePath = new URL("../data/jobs.json", import.meta.url)
      const jobs = JSON.parse(fs.readFileSync(filePath, "utf-8"))

      res.status(200).json(jobs)
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
