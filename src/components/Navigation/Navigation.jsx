import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'

export default function Navigation() {
    return(
        <div className={styles.container}>
            <NavLink to='/' className={styles.homeLink}>Home</NavLink>
            <NavLink to='/movies'className={styles.moviesLink}>Movies</NavLink>
        </div>
    )
}