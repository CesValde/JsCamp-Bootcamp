import { Header } from './Components/Header.jsx'
import { Footer } from './Components/Footer.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { Route } from './Components/Route.jsx'

export function App() {
   return (
      <>
         <Header /> 
         <Route path="/" component={HomePage} />
         <Route path="/search" component={SearchPage} />
         <Footer />
      </>
   )
}