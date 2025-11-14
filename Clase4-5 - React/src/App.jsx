import { useState } from 'react'
import { Header } from './Components/Header.jsx'
import { SearchFilters } from './Components/SearchFilters.jsx'
import { OfertJobs } from './Components/OfertJobs.jsx'
import { Pagination } from './Components/Pagination.jsx'
import { Footer } from './Components/Footer.jsx'
import jobsData from './json/data.json'

const RESULTS_PER_PAGE = 4

export function App () {
   const [filters, setFilters] = useState({
      technology: '',
      modality: '',
      experience: ''
   })
   const [textToFilter, setTextToFilter] = useState("")
   const [currentPage, setCurrentPage] = useState(1)

   // filtrado por opciones
   const jobsFiltersByFilters = jobsData.filter(job => {
      return (
         (filters.technology === '' | job.data.technology === filters.technology)


         /* aplicar los otros filtros */
      )
   })

   // filtrado por texto
   const jobsWithTextFilter = textToFilter === ""
      ? jobsFiltersByFilters 
      : jobsFiltersByFilters.filter(job => {
         return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
      })

   // renderiza luego de filtrar 
   const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

   // ofertas a renderizar por pagina
   const pagedResults = jobsWithTextFilter.slice(
      (currentPage - 1) * RESULTS_PER_PAGE, 
      currentPage * RESULTS_PER_PAGE
   )

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

   return (
      <>
         <Header /> 

         <main> 
            <SearchFilters onSearch={handleSearch} onTextFilter={handleTextFilter}  />
        
            <h2> Resultados de Busqueda </h2>
            <section> 
               <OfertJobs jobs={pagedResults}/>
               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
         </main>

         <Footer />
      </>
   )
}