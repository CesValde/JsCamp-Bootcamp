import { useState, useId } from "react"
import styles from '../SearchFilters.module.css'

export function SearchFilters({ onSearch, onTextFilter }) {
    const [selected, setSelected] = useState("Tecnologia")
    const idSearch = useId()
    const idTechnology = useId()
    const idModality = useId()
    const idContract = useId()
    const idExperience = useId()

    const handleSubmit = (event) => {
        event.preventDefault()

        // event.currentTarget --> escucha el evento
        // even.target --> recibe el evento
        const formData = new FormData(event.currentTarget)

        const filters = {
            technology: formData.get(idTechnology),
            modality: formData.get(idModality),
            experience: formData.get(idExperience)
        }

        onSearch(filters)
    }

    const handleTextChange = (event) => {
        const text = event.target.value
        onTextFilter(text)
    }
    
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

                        /* onFocus - onBlur */
                    />
                    {/* <button type="submit"> Buscar</button> */}
                </div> 

                <div className={styles.searchFilters}>  
                    <select name={idTechnology} value={selected} onChange={(e) => setSelected(e.target.value)}>
                        <option value="">Tecnología</option>
                        <option value="html"> HTML </option>
                        <option value="css"> CSS </option>
                        <option value="js"> Javascript </option>
                        <option value="node"> Node.Js </option>
                        <option value="react"> React </option>
                        <option value="sql"> SQL </option>
                        <option value="php"> PHP </option>
                        <option value="ts"> Typescript </option>
                        <option value="qa"> QA </option>
                    </select>
                    
                    <select name={idModality}>
                        <option value=""> Modalidad </option>
                        <option value="on site"> On site </option>
                        <option value="remoto"> Remoto </option>
                    </select>
                    
                    <select name={idContract}>
                        <option value="">Tipo de contrato</option>
                        <option value="full time"> Full time </option>
                        <option value="part time"> Part Time </option>
                    </select>
                    
                    <select name={idExperience}>
                        <option value="">Nivel de experiencia</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
            </form>

            {/* <span> ni idea que ira aca </span>  */}
        </section>
    )
}