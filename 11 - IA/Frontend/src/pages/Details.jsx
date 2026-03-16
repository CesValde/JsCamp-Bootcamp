import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import styles from "./Details.module.css"
import snarkdown from "snarkdown"
import { Link } from "../Components/Link.jsx"
import { useAuthStore } from "../store/authStore.js"
import { useFavoriteStore } from "../store/favoriteStore.js"

const API_URL = import.meta.env.VITE_API_URL_LOCAL

function JobSection({ title, content }) {
   const html = snarkdown(content)

   return (
      <section className={styles.section}>
         <h2 className={styles.sectionTitle}>{title}</h2>

         <div
            className={`${styles.sectionContent} prose`}
            dangerouslySetInnerHTML={{
               __html: html
            }}
         />
      </section>
   )
}

function DetailsPageBreadCrumb({ job }) {
   return (
      <div className={styles.container}>
         <nav className={styles.breadcrumb}>
            <Link href="/search" className={styles.breadcrumbButton}>
               Empleos
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
         </nav>
      </div>
   )
}

function DetailPageHeader({ job, isLoggedIn }) {
   return (
      <>
         <header className={styles.header}>
            <h1 className={styles.title}>{job.titulo}</h1>
            <p className={styles.meta}>
               {job.empresa} · {job.ubicacion}
            </p>
         </header>

         <DetailApplyButton />
         <DetailsFavoriteButton jobId={job.id} />
      </>
   )
}

function DetailApplyButton() {
   const { isLoggedIn } = useAuthStore()

   return (
      <button disabled={!isLoggedIn} className={styles.applyButton}>
         {isLoggedIn ? "Aplicar ahora" : "inicia sesion para aplicar"}
      </button>
   )
}

function DetailsFavoriteButton({ jobId }) {
   const { toggleFavorite, isFavorite } = useFavoriteStore()

   return (
      <button
         className={styles.btnCancel}
         onClick={() => toggleFavorite(jobId)}
      >
         {isFavorite(jobId) ? "❌" : "❤"}
      </button>
   )
}

function AISummary({ jobId }) {
   const [summary, setSummary] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const generateSummary = async () => {
      setLoading(true)
      setError(null)

      try {
         const response = await fetch(`${API_URL}/ai/summary/${jobId}`)
         if (!response.ok) {
            throw new Error("Error fetching summary")
         }

         const data = await response.json()
         setSummary(data.summary)
      } catch (error) {
         setError("Error al generar el resumen")
      } finally {
         setLoading(false)
      }
   }

   /* si el resumen fue generado lo muestra */
   if (summary) {
      return (
         <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Resumen generado con IA</h2>

            <div className={styles.sectionContent}>
               <p className={styles.sectionContent}>{summary}</p>
            </div>
         </section>
      )
   }

   return (
      <button onClick={generateSummary} disabled={loading}>
         {loading ? "Generando resumen..." : "Generar resumen con IA"}
      </button>
   )
}

export default function JobDetail() {
   const { jobId } = useParams()
   const navigate = useNavigate()

   const [job, setJob] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   useEffect(() => {
      fetch(`${API_URL}/jobs/${jobId}`)
         .then((response) => {
            if (!response.ok) {
               navigate("/not-found")
            }

            return response.json()
         })
         .then((json) => {
            setJob(json)
         })
         .catch((error) => {
            setError(error.message)
         })
         .finally(() => {
            setLoading(false)
         })
   }, [jobId])

   if (loading) {
      return (
         <div
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
         >
            <div className={styles.loading}>
               <p className={styles.loadingText}>Cargando...</p>
            </div>
         </div>
      )
   }

   if (error || !job) {
      return (
         <div
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
         >
            <div className={styles.error}>
               <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
               <button
                  onClick={() => navigate("/")}
                  className={styles.errorButton}
               >
                  Volver al inicio
               </button>
            </div>
         </div>
      )
   }

   return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
         <DetailsPageBreadCrumb job={job} />
         <DetailPageHeader job={job} />
         <AISummary jobId={job.id} />

         <JobSection
            title="Descripción del puesto"
            content={job.content.description}
         />
         <JobSection
            title="Responsabilidades"
            content={job.content.responsibilities}
         />
         <JobSection title="Requisitios" content={job.content.requirements} />
         <JobSection title="Acerca de la empresa" content={job.content.about} />
      </div>
   )
}
