import { Link } from '../Components/Link.jsx'
import { NavLink } from 'react-router'
import styles from '../Header.module.css'
import '../js/devjobs-avatar-element.js'

export function Header() {
   return (
         <header className={styles.headerStyle}> 
            <div className={styles.leftSide}>
               <svg width="34" height="34" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M12.08 24 4 19.248 9.955 8.752l8.085 4.744L18.045 4h11.91l.005 9.496 8.085-4.744L44 19.248 35.92 24 44 28.752l-5.955 10.496-8.085-4.744L29.955 44h-11.91l-.005-9.496-8.085 4.744L4 28.752z" fill="currentColor" fillRule="evenodd"/></svg>
               <Link href="/"> DevJobs </Link>

               <NavLink 
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                  to="/search"
               > Empleos </NavLink>

               <Link href="*"> Empresas </Link>
               <Link href="*"> Salarios </Link>
            </div>
            <div className={styles.rightSide}> 
               <button> Subir CV </button>
               <devjobs-avatar username="CesValde" size="36"> </devjobs-avatar>
            </div>
         </header>
   )
}