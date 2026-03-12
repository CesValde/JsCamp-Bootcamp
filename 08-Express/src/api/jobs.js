import jobs from "../data/jobs.json" with { type: "json" } 

export default function handler(req, res) {
   res.status(200).json(jobs)
}
