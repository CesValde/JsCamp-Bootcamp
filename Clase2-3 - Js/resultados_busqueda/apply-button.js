import { jobsAplicados } from './fetch-data.js'

// evento a los botones de cada oferta para cambiar el contenido y color
const section = document.querySelector('section')

section.addEventListener('click', function(event) {
    const element = event.target

    /* Si el elemento al hacer click tiene esta clase entonces... */
    if(element.classList.contains('btn-aplicar')) {
        // para guardar las ofertas aplicadas
        const jobId = element.dataset.id  // obtenemos el id del trabajo
        jobsAplicados.add(jobId)

        element.textContent = 'Aplicado, suerte!'
        element.classList.add('esta-aplicado')
        element.disabled = true
    }
})