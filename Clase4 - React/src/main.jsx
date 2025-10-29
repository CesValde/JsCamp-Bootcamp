import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Header.css'
import './json/data.json'


import Header from './Components/Header.jsx'
import FiltrosBusqueda from './Components/FiltrosBusqueda.jsx'
import OfertasEmpleos from './Components/OfertasEmpleos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Header />
    <FiltrosBusqueda />
    <OfertasEmpleos />

  </StrictMode>,
)
