const container = document.querySelector('section') 

// cantidad de paginas por navegacion
const RESULTS_PER_PAGE = 3

// fetch es asincrono
fetch('./data.json') 
    .then((response) => {
        return response.json()
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const div = document.createElement('div')
            div.className = 'ofert-jobs'
    
            // Si es array → lo convierte a texto JSON, sino lo deja como esta
            div.dataset.technology = Array.isArray(job.data.technology) 
            ? JSON.stringify(job.data.technology)
            : job.data.technology

            // modalidad -> remoto/onsite
            div.dataset.modalidad = job.data.modalidad
            div.dataset.contrato = job.data.contrato
            div.dataset.nivel = job.data.nivel

            div.innerHTML = 
            `
                <button class="btn-aplicar"> Aplicar</button>
                <h3 class="title-ofertas"> ${job.titulo} </h3>
                <small class="descrip-ofertas"> ${job.empresa} | ${job.ubicacion} </small>
                <p class="parraf-ofertas"> 
                    ${job.descripcion}
                </p>
            `
            container.appendChild(div)
        });
    })