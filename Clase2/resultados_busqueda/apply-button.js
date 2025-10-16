// evento a los botones de cada oferta para cambiar el contenido y color
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