// cada vez que se aplique un filtro se escuchara el evento que mostrara las ofertas con dicho filtro 
export function filtrarOfertas(allJobs) {
    const filtros = document.querySelector('.container-filtros')
    const input = document.querySelector('input')

    const texto = input.value.toLowerCase().trim()
    const [tecnologia, modalidad, contrato, nivel] = Array.from(
        filtros.querySelectorAll('select')
    ).map(s => s.value)

    // filtrar a nivel de datos, no de elementos DOM, recorre cada oferta y retorna las ofertas en base a los filtros seleccionados
    return allJobs.filter(job => {
        const techs = Array.isArray(job.data.technology)
        ? job.data.technology
        : [job.data.technology]

        // validacion de selects
        const coincideTecnologia = tecnologia === '' || techs.includes(tecnologia)
        const coincideModalidad = modalidad === '' || job.data.modalidad === modalidad
        const coincideContrato = contrato === '' || job.data.contrato === contrato
        const coincideNivel = nivel === '' || job.data.nivel === nivel

        // validacion de input
        const titulo  = job.titulo.toLowerCase()
        const empresa = job.empresa.toLowerCase()
        const coincideBusqueda = texto === '' || titulo.includes(texto) || empresa.includes(texto)

        return coincideTecnologia && coincideModalidad && coincideContrato && coincideNivel && coincideBusqueda
    })
}