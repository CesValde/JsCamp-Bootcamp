import jobs from "../src/data/jobs.json"

export default function handler(req, res) {
   res.status(200).json(jobs)
}
