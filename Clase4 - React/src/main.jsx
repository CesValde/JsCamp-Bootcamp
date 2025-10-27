import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Header.css'


import Header from './Components/Header.jsx'
import FiltrosBusqueda from './Components/FiltrosBusqueda.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Header />
    <FiltrosBusqueda />

  </StrictMode>,
)
