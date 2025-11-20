import { useState, useId, useRef } from "react"
import styles from '../SearchFilters.module.css'

export const useSearchFilters = ({ idTechnology, idLocation, idNivel, onSearch, idSearch,  onTextFilter }) => {
    const timeoutId = useRef(null)
    const [searchText, setSearchText] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        // event.currentTarget --> escucha el evento
        // even.target --> recibe el evento
        const formData = new FormData(event.currentTarget)

        if(event.target.name === idSearch) {return}

        const filters = {
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experienceLevel: formData.get(idNivel)
        }

        onSearch(filters)
    }

    const handleTextChange = (event) => {
        const text = event.target.value
        setSearchText(text)

        // DEBOUNCE: Cancelar el timeout anterior
        if(timeoutId.current) {
            clearTimeout(timeoutId.current) 
        }

        timeoutId.current = setTimeout(() => {
            onTextFilter(text)     
        }, 500)
    } 

    return {
        searchText,
        handleSubmit,
        handleTextChange
    }
}

export function SearchFilters({ onSearch, onTextFilter, initialText }) {
    const idSearch = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idNivel = useId()
    const inputRef = useRef()

    const { handleSubmit, handleTextChange } = useSearchFilters({ idTechnology, idLocation, idNivel, onSearch, idSearch, onTextFilter })

    const handleClearInput = (event) => {
        event.preventDefault()
        inputRef.current.value = ""
        onTextFilter("")
    } 
    
    return (
        <section className={styles.busqueda}> 
            <h1> Encuentra tu proximo trabajo </h1>
            <p> Explora miles de oportunidades en el sector tecnologico. </p>

            <form onChange={handleSubmit}> 
                <div className={styles.inputSearch}> 
                    <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>

                    <button onClick={handleClearInput}> Limpiar Input </button>
                    <input name={idSearch} 
                        ref={inputRef}
                        type="text" 
                        placeholder="Buscar trabajos, empresas o habilidades" 
                        onChange={handleTextChange}
                        defaultValue={initialText} 
                    />
                </div> 

                <div className={styles.searchFilters}>  
                    <select name={idTechnology}>
                        <option value="">Tecnología</option>
                        <option value="javascript"> Javascript </option>
                        <option value="python"> Python </option>
                        <option value="node"> Node.Js </option>
                        <option value="react"> React </option>
                        <option value="sql"> SQL </option>
                    </select>
                    
                    <select name={idLocation}>
                        {/* Revisar los campos en la API */}
                        <option value=""> Ubicacion </option>
                        <option value="remoto"> Remoto </option>
                    </select>
                    
                    <select name={idNivel}>
                        {/* Revisar los campos en la API */}
                        <option value="">Nivel de experiencia</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
            </form>
        </section>
    )
}