import { useState, useEffect } from "react"
import '../OfertasEmpleos.css'
import data from "../json/data.json"

function OfertasEmpleos() {
   const [jobs, setJobs] = useState([])
   const [appliedJobs, setAppliedJobs] = useState({})    // estado para cada job


   useEffect(() => {
      setJobs(data)
   }, [])

   // manejar click de aplicar
   const handleClick = (jobId) => {
      setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
   }

   return (
      <section>
      {jobs.length === 0 ? (
         <p>No hay ofertas disponibles</p>
      ) : (
         jobs.map(job => {
            const isApplied = appliedJobs[job.id] || false;

            return (
               <div
                  className="ofert-jobs"
                  key={job.id}
                  data-technology={
                     Array.isArray(job.data.technology)
                     ? JSON.stringify(job.data.technology)
                     : job.data.technology
                  }
                  data-modalidad={job.data.modalidad}
                  data-contrato={job.data.contrato}
                  data-nivel={job.data.nivel}
               >
                  <button
                     className={`btn-aplicar ${isApplied ? "esta-aplicado" : ''}`}
                     onClick={() => handleClick(job.id)}
                     /* disabled={isApplied} */
                  >
                     {isApplied ? "Aplicado!" : "Aplicar"}
                  </button>

                  <h3 className="title-ofertas">{job.titulo}</h3>
                  <small className="descrip-ofertas">{job.empresa} | {job.ubicacion}</small>
                  <p className="parraf-ofertas">{job.descripcion}</p>
               </div>
            );
         })
      )}
      </section>
   );
}

export default OfertasEmpleos;