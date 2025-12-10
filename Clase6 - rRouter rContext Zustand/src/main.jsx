import { StrictMode } from "react"
import { AuthProvider } from "./context/AuthContext.jsx"
import { FavoritesProvider } from "./context/FavContext.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { App } from "./App.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
)
