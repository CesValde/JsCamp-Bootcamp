import { useState } from "react"
import styles from "../OfertJobs.module.css"
import { Link } from "./Link"
import { useFavoriteStore } from "../store/favoriteStore.js"
import { useAuthStore } from "../store/authStore.js"

function JobCardFavoriteButton({ jobId }) {
   const { toggleFavorite, isFavorite } = useFavoriteStore()
   const { isLoggedIn } = useAuthStore()

   return (
      <button
         disabled={!isLoggedIn}
         className={styles.btnCancel}
         onClick={() => toggleFavorite(jobId)}
      >
         {isFavorite(jobId) ? "❌" : "❤"}
      </button>
   )
}

function JobCardApplyButton({ jobId }) {
   const [isApplied, setIsApplied] = useState(false)
   const { isLoggedIn } = useAuthStore()

   const buttonClasses = isApplied
      ? `${styles.btnApplied} ${styles.isApplied}`
      : styles.btnApplied
   const buttonText = isApplied ? "Aplicado, Suerte!" : "Aplicar"

   const handleApplyClick = () => {
      console.log(`Aplicado al trabajo con id:`, jobId)
      setIsApplied(true)
   }

   return (
      <button
         disabled={!isLoggedIn}
         className={buttonClasses}
         onClick={handleApplyClick}
      >
         {buttonText}
      </button>
   )
}

export function JobCard({ job }) {
   return (
      <article
         className={styles.ofertJob}
         data-technology={
            Array.isArray(job.data.technology)
               ? JSON.stringify(job.data.technology)
               : job.data.technology
         }
         data-modalidad={job.data.modalidad}
         data-contrato={job.data.contrat}
         data-nivel={job.data.nivel}
      >
         <div className={styles.descrip}>
            <h3>
               <Link href={`/jobs/${job.id}`}>{job.titulo}</Link>
            </h3>
            <small>
               {job.empresa} | {job.ubicacion}
            </small>
            <p>{job.descripcion}</p>
         </div>

         <div className={styles.actions}>
            <Link href={`/jobs/${job.id}`} className={styles.details}>
               Ver Detalles
            </Link>
            <JobCardApplyButton jobId={job.id} />
            <JobCardFavoriteButton jobId={job.id} />
         </div>
      </article>
   )
}
