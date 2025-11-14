import { JobCard } from './JobCard'
import styles from '../OfertJobs.module.css'

export function OfertJobs({ jobs }) {
   return (
      <>
         <div className={styles.ofertJobs}> 
            {jobs.map(job => (
               <JobCard key={job.id} job={job} /> 
            ))}
         </div>
      </>
   )
}