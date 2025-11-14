import { JobCard } from './JobCard'
import styles from '../OfertJobs.module.css'

export function OfertJobs({ jobs }) {
   return (
      <>
         <h2 style={{ textAlign: "center", padding: "20px 0" }}> Resultados de Busqueda </h2>

         <div className={styles.ofertJobs}> 
            {jobs.map(job => (
               <JobCard key={job.id} job={job} /> 
            ))}
         </div>
      </>
   )
}