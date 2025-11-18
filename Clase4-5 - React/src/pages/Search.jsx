import { useState, useEffect } from 'react'
import { SearchFilters } from '../Components/SearchFilters.jsx'
import { OfertJobs } from '../Components/OfertJobs.jsx'
import { Pagination } from '../Components/Pagination.jsx'

const RESULTS_PER_PAGE = 4

const useFilters = () => {
   const [filters, setFilters] = useState({
      technology: '',
      location: '',
      experience: ''
   })
   const [textToFilter, setTextToFilter] = useState("")
   const [currentPage, setCurrentPage] = useState(1)
   const [jobs, setJobs] = useState([])
   const [total, setTotal] = useState(0)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      async function fetchJobs() {
         try {
            setLoading(true)

            const params = new URLSearchParams()
            if(textToFilter) params.append('text', textToFilter)
            if(filters.technology) params.append('technology', filters.technology)
            if(filters.modalidad) params.append('type', filters.modalidad)
            if(filters.nivel) params.append('level', filters.nivel)

            const offset = (currentPage -1 ) * RESULTS_PER_PAGE
            params.append('limit', RESULTS_PER_PAGE)
            params.append('offset', offset)

            const queryParams = params.toString()
            const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
            const json = await response.json()

            setJobs(json.data)
            setTotal(json.total)
         } catch (error) {
            console.error('Error fetching jobs: ', error)
         } finally {
            setLoading(false)
         }
      }

      fetchJobs()
   }, [filters, textToFilter, currentPage])

   // renderiza luego de filtrar 
   const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

   // actualiza el estado de la pagina actual
   const handlePageChange = (page) => {
      setCurrentPage(page)
   }

   const handleSearch = (filters) => {
      setFilters(filters)
      setCurrentPage(1)
   }

   const handleTextFilter = (newTextToFilter) => {
      setTextToFilter(newTextToFilter)
      setCurrentPage(1)
   }

   return {
      loading,
      jobs,
      total,
      totalPages,
      currentPage,
      handlePageChange,
      handleSearch,
      handleTextFilter
   }
}

export function SearchPage () {
   const  {
      jobs,
      total,
      loading,
      totalPages, 
      currentPage,
      handlePageChange,
      handleSearch,
      handleTextFilter
   } = useFilters()

   const title = loading 
   ? `Cargando... - DebJobs` 
   : `Resultados: ${total}, Pagina ${currentPage} - DevJobs`

   return (
      <>
         <title> {title} </title>
         <main> 
            <SearchFilters onSearch={handleSearch} onTextFilter={handleTextFilter}  />
        
            <section> 
               <h2 style={{ textAlign: "center", padding: "20px 0" }}> Resultados de Busqueda </h2>
               <OfertJobs jobs={jobs}/>
               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
         </main>
      </>
   )
}