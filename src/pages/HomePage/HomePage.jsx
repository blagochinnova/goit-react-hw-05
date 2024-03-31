import styles from './HomePage.module.css'
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trending Movies</h1>
            <MovieList url="https://api.themoviedb.org/3/trending/movie/day?language=en-US"/>
        </div>
    );
}