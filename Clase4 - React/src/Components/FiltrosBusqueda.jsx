import '../FiltrosBusqueda.css'

function FiltrosBusqueda() {
    return (
        <>
            <div class="busqueda">
                <h1> Encuentra tu proximo trabajo </h1>
                <p> Explora miles de oportunidades en el sector tecnologico. </p>
                <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                <input type="text" placeholder="Buscar trabajos, empresas o habilidades" /> 

                <div class="container-filtros">  
                    <select name="tecnologia">
                        <option value="" selected>Tecnología</option>
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
                    
                    <select name="modalidad">
                        <option value="" selected> Modalidad </option>
                        <option value="on site"> On site </option>
                        <option value="remoto"> Remoto </option>
                    </select>
                    
                    <select name="contrato">
                        <option value="" selected>Tipo de contrato</option>
                        <option value="full time"> Full time </option>
                        <option value="part time"> Part Time </option>
                    </select>
                    
                    <select name="nivelexp">
                        <option value="" selected>Nivel de experiencia</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
                <h2> Resultados de Busqueda </h2>
            </div>
        </>
    )
}

export default FiltrosBusqueda