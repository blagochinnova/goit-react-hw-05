import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Outlet, NavLink, Link } from "react-router-dom";
import styles from './MovieDetailsPage.module.css'

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams(); 
    
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTNkMDJlOTBjZDQzOTUzY2NhNzYwNTMzMjU0YTdiYyIsInN1YiI6IjY2MDg4ZTM4NTkwMDg2MDE3Y2I5YjcyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOpEDstQv63yFICfnBBjRdkNIJbPnVWeLT47E52VM-Q'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Link to="/movies" className={styles.backLink}>Go to Movies</Link>
            <div className={styles.fullInfo}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className={styles.image}/>
                <div className={styles.info}>
                    <h2 className={styles.title}>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>Avarage rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                    <p>Release Date: {movie.release_date}</p>
                </div>
            </div>
            <div className={styles.links}>
            <NavLink to={`/movies/${movieId}/cast`} className={styles.castLink}>Cast</NavLink>
            <NavLink to={`/movies/${movieId}/reviews`} className={styles.reviewsLink}>Reviews</NavLink>
            </div>
            <Outlet />
        </div>
    );
}