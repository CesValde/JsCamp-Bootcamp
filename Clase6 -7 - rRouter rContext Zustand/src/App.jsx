import { useState } from "react"

import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"

import { Header } from "./Components/Header.jsx"
import { Footer } from "./Components/Footer.jsx"
import { ProtectedRoute } from "./Components/ProtectedRoute.jsx"

/* Mejora el rendimieto, descarga lo necesario cuando vas a la url solicitada */
const HomePage = lazy(() => import("./pages/Home.jsx"))
const SearchPage = lazy(() => import("./pages/Search.jsx"))
const NotFoundPage = lazy(() => import("./pages/404.jsx"))
const JobDetail = lazy(() => import("./pages/Details.jsx"))
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"))
const Login = lazy(() =>  import("./pages/Login.jsx"))
const Register = lazy(() =>  import("./pages/Register.jsx"))

export function App() {
   return (
      <>
         <Header />

         <Suspense
            fallback={
               <div
                  style={{
                     maxWidth: "1280px",
                     margin: "0 auto",
                     padding: "0 1rem"
                  }}
               >
                  Cargando...
               </div>
            }
         >
            <Routes>
               {/* Pasar por prop el nombre del elemento, no el componente */}
               <Route path="/" element={<HomePage />} />
               <Route path="/search" element={<SearchPage />} />
               <Route path="/jobs/:jobId" element={<JobDetail />} />
               <Route
                  path="/profile"
                  element={
                     <ProtectedRoute>
                        <ProfilePage />
                     </ProtectedRoute>
                  }
               />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </Suspense>

         <Footer />
      </>
   )
}
