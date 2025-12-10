import { JobCard } from './JobCard'
import styles from '../OfertJobs.module.css'

export function OfertJobs({ jobs }) {
   return (
      <>
         <div className={styles.ofertJobs}> 
            {
               jobs.length === 0 && (
                  <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance'}}> 
                     No hay ofertas disponibles para ese criterio
                  </p>
               )
            }
            {jobs.map(job => (
               <JobCard key={job.id} job={job} /> 
            ))}
         </div>
      </>
   )
}