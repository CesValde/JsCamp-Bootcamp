import { useState, useEffect } from 'react'
import { SearchFilters } from '../Components/SearchFilters.jsx'
import { OfertJobs } from '../Components/OfertJobs.jsx'
import { Pagination } from '../Components/Pagination.jsx'
import { useRouter } from '../hooks/useRouter.jsx'

const RESULTS_PER_PAGE = 4

const useFilters = () => {
   const [filters, setFilters] = useState(() => {
      const params = new URLSearchParams(window.location.search)
      return {
         technology: params.get('technology') || '',
         location: params.get('type') || '',
         experienceLevel: params.get('level') || ''
      }
   })
   const [textToFilter, setTextToFilter] = useState(() => {
      const params = new URLSearchParams(window.location.search)
      return params.get('text') || ''
   })

   const [currentPage, setCurrentPage] = useState(() => {
      const params = new URLSearchParams(window.location.search)
      const page = Number(params.get('page')) || 1
      return Number.isNaN(page) ? page  : 1 
   })

   const [jobs, setJobs] = useState([])
   const [total, setTotal] = useState(0)
   const [loading, setLoading] = useState(true)

   const { navigateTo } = useRouter()

   useEffect(() => {
      async function fetchJobs() {
         try {
            setLoading(true)

            const params = new URLSearchParams()
            if(textToFilter) params.append('text', textToFilter)
            if(filters.technology) params.append('technology', filters.technology)
            if(filters.location) params.append('type', filters.location)
            if(filters.experienceLevel) params.append('level', filters.experienceLevel)

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

   useEffect(() => {
      const params = new URLSearchParams()

      if(textToFilter) params.append('text', textToFilter)
      if(filters.technology) params.append('technology', filters.technology)
      if(filters.location) params.append('type', filters.location)
      if(filters.experienceLevel) params.append('level', filters.experienceLevel)

      if(currentPage > 1) params.append('page', currentPage)

      const newUrl = params.toString()
         ? `${window.location.pathname}?${params.toString()}`
         : window.location.pathname

      navigateTo(newUrl)
   }, [filters, textToFilter, currentPage, navigateTo])

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
      textToFilter,
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
      textToFilter,
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
            <SearchFilters 
               initialText={textToFilter} 
               onSearch={handleSearch} 
               onTextFilter={handleTextFilter}  
            />
        
            <section> 
               <h2 style={{ textAlign: "center", padding: "20px 0" }}> Resultados de Busqueda </h2>
               <OfertJobs jobs={jobs}/>
               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
         </main>
      </>
   )
}