import { filtrarOfertas } from './filters.js'

const container = document.querySelector('section')
const filtros = document.querySelector('.container-filtros')
const input = document.querySelector('input')
const footerNums = document.querySelector('footer .nums')

const RESULTS_PER_PAGE = 4
let currentPage = 1
let allJobs = []
let filteredJobs = []

export let jobsAplicados = new Set()  // guardamos los IDs de los trabajos aplicados

fetch('./data.json')
  .then(res => res.json())
  .then(jobs => {
    allJobs = jobs
    filteredJobs = [...allJobs]
    renderPagination()
    renderJobs()
  })

// Aplica filtros y renderiza
function aplicarFiltrosYRender() {
    filteredJobs = filtrarOfertas(allJobs)
    currentPage = 1
    renderPagination()
    renderJobs()
}

// renderiza las ofertas a mostrar
export function renderJobs() {
    container.innerHTML = ''
    const start = (currentPage - 1) * RESULTS_PER_PAGE  // calcula desde qué índice del array filteredJobs se deben tomar los trabajos.
    const end = start + RESULTS_PER_PAGE                // indica hasta qué índice tomar.
    const jobsToShow = filteredJobs.slice(start, end)   // obtiene solo los trabajos de esa "página".

    jobsToShow.forEach(job => {
        const div = document.createElement('div')
        div.className = 'ofert-jobs'
        div.dataset.technology = Array.isArray(job.data.technology)
            ? JSON.stringify(job.data.technology)
            : job.data.technology
        div.dataset.modalidad = job.data.modalidad
        div.dataset.contrato = job.data.contrato
        div.dataset.nivel = job.data.nivel

        div.innerHTML = `
            <button class="btn-aplicar" data-id="${job.id}">Aplicar</button>
            <h3 class="title-ofertas">${job.titulo}</h3>
            <small class="descrip-ofertas">${job.empresa} | ${job.ubicacion}</small>
            <p class="parraf-ofertas">${job.descripcion}</p>
        `

        // si hay una oferta que ya fue aplicada, se recuerda
        const button = div.querySelector('.btn-aplicar')
        if (jobsAplicados.has(job.id)) {
            button.textContent = 'Aplicado, suerte!'
            button.classList.add('esta-aplicado')
            button.disabled = true
        }

        container.appendChild(div)
    })
    updatePagination()
}

// Actualiza la paginacion
function updatePagination() {
    const totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE)
    const links = footerNums.querySelectorAll('a')

    links.forEach(link => link.classList.remove('active'))
    const activeLink = [...links].find(a => Number(a.textContent) === currentPage)
    if (activeLink) activeLink.classList.add('active')

    const prev = footerNums.querySelector('.prev')
    const next = footerNums.querySelector('.next')

    // Opaca las flechitas
    prev.style.opacity = currentPage === 1 ? '0.3' : '1'
    next.style.opacity = currentPage === totalPages ? '0.3' : '1'

    // habilita pointer en las flechitas
    prev.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer'
    next.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer'
}

// Renderiza los links del footer en base a la cant de paginas
function renderPagination() {
    const totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE)
    footerNums.innerHTML = `<span class="prev">&lt;</span><span class="next">&gt;</span>`

    // se crean los 'a' necesarios 
    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement('a')
        a.href = '#'
        a.textContent = i
        if (i === currentPage) a.classList.add('active')
        footerNums.insertBefore(a, footerNums.querySelector('.next'))

        // activa el evento para cambiar de pagina desde el link
        a.addEventListener('click', e => {
            e.preventDefault()  // evita que el navegador intente ir al href="#"
            currentPage = i
            renderJobs()
        })
    }

    const prev = footerNums.querySelector('.prev')
    const next = footerNums.querySelector('.next')

    // lleva a la pagina anterior de las ofertas
    prev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--
            renderJobs()
        }
    })

    // lleva a la pagina siguiente de las ofertas
    next.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++
            renderJobs()
        }
    })
}

// Eventos
input.addEventListener('input', aplicarFiltrosYRender)
filtros.addEventListener('change', aplicarFiltrosYRender)