import { useState } from "react"
import styles from '../OfertJobs.module.css'

export function JobCard({ job }) {
   const [isApplied, setIsApplied] = useState(false)

   const handleApplyClick = () => {
      setIsApplied(true)
   }

   const buttonClasses = isApplied ? `${styles.btnApplied} ${styles.isApplied}` : styles.btnApplied
   const buttonText = isApplied ? 'Aplicado, Suerte!' : 'Aplicar'

   return (
      <article
         className = {styles.ofertJob}
         data-technology = { Array.isArray(job.data.technology)
            ? JSON.stringify(job.data.technology)
            : job.data.technology
         }
         data-modalidad = { job.data.modalidad }
         data-contrato = { job.data.contrat }
         data-nivel = { job.data.nivel }
      > 
         <div> 
            <button className={buttonClasses} onClick={handleApplyClick} /* data-id={job.id} */> {buttonText} </button>
            <h3>{job.titulo}</h3>
            <small>{job.empresa} | {job.ubicacion}</small>
            <p>{job.descripcion}</p>
         </div>
      </article>
   )
}