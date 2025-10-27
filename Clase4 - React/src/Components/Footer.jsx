import '../Footer.css'

function Footer() {

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

   return (
      <>
        renderPagination()
      </>
   )
}

export default Footer