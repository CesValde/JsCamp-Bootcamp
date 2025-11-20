import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

import { Header } from './Components/Header.jsx'
import { Footer } from './Components/Footer.jsx'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const JobDetail = lazy(() => import('./pages/Details.jsx'))


export function App() {
   return (
      <>
         <Header /> 

         <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>Cargando...</div>}>
            <Routes> 
               {/* Pasar por prop el nombre del elemento, no el componente */}
               <Route path="/" element={<HomePage />} />
               <Route path="/search" element={<SearchPage />} />
               <Route path="/jobs/:jobId" element={<JobDetail />} />
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </Suspense>

         <Footer />
      </>
   )
}