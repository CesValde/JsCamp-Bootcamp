import { Router } from "express"
import { JobController } from "../controllers/jobs.js"
import { validateJob, validatePartialJob } from "../schemas/jobs.js"

export const jobsRouter = Router()

function validateCreate(req, res, next) {
   const result = validateJob(req.body)
   if (result.success) {
      req.body = result.data
      return next()
   }

   return res
      .status(400)
      .json({ error: "Invalidad request", details: result.error.errors })
}

function validateUpdate(req, res, next) {
   const result = validatePartialJob(req.body)
   if (result.success) {
      req.body = result.data
      return next()
   }

   return res.status(400).json({ error: JSON.parse(result.error.message) })
}

jobsRouter.get("/", JobController.getAll)
jobsRouter.get("/:id", JobController.getId)
jobsRouter.post("/", validateCreate, JobController.create)
jobsRouter.put("/:id", validateUpdate, JobController.update)
jobsRouter.patch("/:id", JobController.partialUpdate)
jobsRouter.delete("/:id", JobController.delete)
