// cada vez que se aplique un filtro se escuchara el evento que mostrara las ofertas con dicho filtro 
const filtros = document.querySelector('.container-filtros')

filtros.addEventListener('change', () => {
    // obtengo todos los select
    const jobs = document.querySelectorAll('.ofert-jobs')
    // array.from convierte ese NodeList en un array real de JavaScript (para poder usar .map() y otros métodos de array).
    // .map(s => s.value) recorre cada <select> y devuelve su valor actual seleccionado (s.value), 'toma el value de cada select'
    const [tecnologia, modalidad, contrato, nivel] = Array.from(filtros.querySelectorAll('select')).map(s => s.value)

    // se recorren cada oferta y muestra las ofertas en base a los filtros seleccionados
    jobs.forEach(job => {

        let techs = []
        // hago try catch porque si es un string lo toma como error al hacer '.parse'
        try {
            techs = JSON.parse(job.dataset.technology)  // intento parsear
            if (!Array.isArray(techs)) techs = [techs]  // si no es array, lo convierto en array
        } catch (e) {
            techs = [job.dataset.technology]  // si falla, guardo el valor como array con un solo elemento
        }

        const coincideTecnologia = tecnologia === '' || techs.includes(tecnologia)
        const coincideModalidad = modalidad === '' || job.dataset.modalidad === modalidad
        const coincideContrato  = contrato === '' || job.dataset.contrato === contrato
        const coincideNivel = nivel === '' || job.dataset.nivel === nivel

        // si todos coinciden → mostrar
        if (coincideTecnologia && coincideModalidad && coincideContrato && coincideNivel) {
            job.style.display = 'block'
        } else {
            job.style.display = 'none'
        }
    })
})