import { useState, useId } from "react"
import styles from '../SearchFilters.module.css'

let timeoutId = null

export const useSearchFilters = ({ idTechnology, idLocation, idNivel, onSearch, idSearch,  onTextFilter }) => {
    const [searchText, setSearchText] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        // event.currentTarget --> escucha el evento
        // even.target --> recibe el evento
        const formData = new FormData(event.currentTarget)

        if(event.target.name === idSearch) {return}

        const filters = {
            technology: formData.get(idTechnology),
            modalidad: formData.get(idLocation),
            nivel: formData.get(idNivel)
        }

        onSearch(filters)
    }

    const handleTextChange = (event) => {
        const text = event.target.value
        setSearchText(text)

        // DEBOUNCE: Cancelar el timeout anterior
        if(timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            onTextFilter(text)     
        }, 500)
    }

    return {
        searchText,
        handleSubmit,
        handleTextChange
    }
}

export function SearchFilters({ onSearch, onTextFilter }) {
    const [selected, setSelected] = useState("Tecnologia")

    const idSearch = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idNivel = useId()

    const { handleSubmit, handleTextChange } = useSearchFilters({ idTechnology, idLocation, idNivel, onSearch, idSearch, onTextFilter })
    
    return (
        <section className={styles.busqueda}> 
            <h1> Encuentra tu proximo trabajo </h1>
            <p> Explora miles de oportunidades en el sector tecnologico. </p>

            <form onChange={handleSubmit}> 
                <div className={styles.inputSearch}> 
                    <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>

                    <input name={idSearch} 
                        type="text" 
                        placeholder="Buscar trabajos, empresas o habilidades" 
                        onChange={handleTextChange}
                    />
                </div> 

                <div className={styles.searchFilters}>  
                    <select name={idTechnology} value={selected} onChange={(e) => setSelected(e.target.value)}>
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