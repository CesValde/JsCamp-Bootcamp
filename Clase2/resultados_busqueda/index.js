const botonAplicar = document.querySelector('section')

botonAplicar.addEventListener('click', function(event) {
    const element = event.target

    /* Si el elemento al hacer click tiene esta clase entonces... */
    if(element.classList.contains('btn-aplicar')) {
        element.textContent = 'Aplicado, suerte!'
        element.classList.add('esta-aplicado')
        element.disabled = true
    }
})

const filtros = document.querySelector('.container-filtros')
const ofertas = document.querySelectorAll('.ofert-jobs')

filtros.addEventListener('change', () => {
    // obtener valores de cada select
    const [categoria, ubicacion, contrato, nivel] = Array.from(filtros.querySelectorAll('select')).map(s => s.value)

    ofertas.forEach(oferta => {
        const coincideCategoria = categoria === 'sector' || oferta.dataset.categoria === categoria
        const coincideUbicacion = ubicacion === 'ubicacion' || oferta.dataset.ubicacion === ubicacion
        const coincideContrato  = contrato === 'tipo-de-contrato' || oferta.dataset.contrato === contrato
        const coincideNivel = nivel === 'nivel-de-experiencia' || oferta.dataset.nivel === nivel

        // si todos coinciden → mostrar
        if (coincideCategoria && coincideUbicacion && coincideContrato && coincideNivel) {
            oferta.style.display = 'block'
        } else {
            oferta.style.display = 'none'
        }
    })
})