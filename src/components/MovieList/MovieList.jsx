import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css'; 

export default function MovieList({ searchQuery, url, handleInputVisibility }) {
    const [movies, setMovies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTNkMDJlOTBjZDQzOTUzY2NhNzYwNTMzMjU0YTdiYyIsInN1YiI6IjY2MDg4ZTM4NTkwMDg2MDE3Y2I5YjcyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOpEDstQv63yFICfnBBjRdkNIJbPnVWeLT47E52VM-Q'
                    }
                });
                setMovies(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }

        if (searchQuery !== '') {
            fetchMovies();
        }
    }, [searchQuery, url]);

    useEffect(() => {
        if (location.pathname === '/movies') {
            handleInputVisibility(true);
        }
    }, [location.pathname, handleInputVisibility]);

    const handleMovieClick = () => {
        handleInputVisibility(false); 
        setMovies([]);
    };    

    return (
        <div>
            <ul className={styles.movieList}> 
                {movies.map(movie => (
                    <li key={movie.id} className={styles.movieListItem}> 
                        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className={styles.image}/>
                        <NavLink to={`/movies/${movie.id}`} onClick={handleMovieClick} className={styles.movieLink}>{movie.title}</NavLink> 
                    </li>
                ))}
            </ul>
        </div>
    );
}