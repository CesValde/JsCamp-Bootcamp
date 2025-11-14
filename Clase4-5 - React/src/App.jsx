 import { Header } from './Components/Header.jsx'
import { Footer } from './Components/Footer.jsx'

import { HomePage } from './pages/home.jsx'
import { SearchPage } from './pages/search.jsx'
import { NotFoundPage } from './pages/404.jsx'

export function App() {
   const currenPath = window.location.pathname

   let page = <NotFoundPage />

   if(currenPath === '/') {
      page = <HomePage />
   } else if(currenPath === '/search') {
      page = <SearchPage />
   }

   return (
      <>
         <Header /> 
         {page}
         <Footer />
      </>
   )
}