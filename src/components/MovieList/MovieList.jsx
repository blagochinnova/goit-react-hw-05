import { NavLink, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
    const location = useLocation()

    return (
        <div>
            <ul className={styles.movieList}>
                {movies.map(movie => (
                    <li key={movie.id} className={styles.movieListItem}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className={styles.image} />
                        <NavLink 
                            to={`/movies/${movie.id}`} 
                            className={styles.movieLink} 
                            state={{ from: location }}
                        >
                            {movie.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}