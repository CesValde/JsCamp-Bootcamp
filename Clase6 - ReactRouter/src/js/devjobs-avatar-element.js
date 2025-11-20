// Crea una clase que hereda de HTMLElement. Así podés definir un nuevo tipo de etiqueta HTML con su propio comportamiento.
class DevJobsAvatar extends HTMLElement {
    /* 
        super() → llama al constructor original de HTMLElement (obligatorio).
        this.attachShadow({ mode: 'open' }) → crea un Shadow DOM,
        un “DOM encapsulado” dentro del elemento, que:
        Aísla los estilos y estructura interna del resto de la página.
        Se accede con this.shadowRoot.
    */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    // Construye la URL de la imagen del avatar según el servicio y el usuario.
    createUrl(service, username) {
        return `https://unavatar.io/${service}/${username}`
    }

    render() {
        const service = this.getAttribute('service') ?? 'github'
        const username = this.getAttribute('username') ?? 'CesValde'
        const size = this.getAttribute('size') ?? '36'

        const url = this.createUrl(service, username)

        this.shadowRoot.innerHTML = `
            <style>
            img {
                width: ${size}px;
                height: ${size}px;
                border-radius: 9999px;
            }
            </style>

            <img 
                src="${url}" 
                alt="Avatar de ${username}" 
                class="avatar"
            />
        `
    }

    // Es un callback del ciclo de vida del componente. Se ejecuta automáticamente cuando el elemento entra al DOM.
    connectedCallback() {
        this.render()
    }
}

/* 
    Registra tu nueva etiqueta personalizada con el nombre devjobs-avatar. 
    Desde este punto podés usarla directamente en HTML como si fuera una etiqueta nativa.
*/
customElements.define('devjobs-avatar', DevJobsAvatar)