import '../Header.css'

function Header() {
   return (
      <> 
         <header> 
            <div className="head-left">
               <svg width="34" height="34" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M12.08 24 4 19.248 9.955 8.752l8.085 4.744L18.045 4h11.91l.005 9.496 8.085-4.744L44 19.248 35.92 24 44 28.752l-5.955 10.496-8.085-4.744L29.955 44h-11.91l-.005-9.496-8.085 4.744L4 28.752z" fill="currentColor" fillRule="evenodd"/></svg>
               <a href=""> DevJobs </a>
               <a href=""> Inicio </a>
               <a href=""> Empleos </a>
               <a href=""> Empresas </a>
               <a href=""> Salarios </a>
            </div>
            <div className="head-right"> 
               <button> Subir CV </button>
               <devjobs-avatar username="CesValde" size="36"> </devjobs-avatar>
            </div>
         </header>
      </>
   )
}

export default Header