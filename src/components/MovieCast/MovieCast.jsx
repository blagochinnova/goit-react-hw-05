import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './MovieCast.module.css'

export default function MovieCast() {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams(); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTNkMDJlOTBjZDQzOTUzY2NhNzYwNTMzMjU0YTdiYyIsInN1YiI6IjY2MDg4ZTM4NTkwMDg2MDE3Y2I5YjcyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOpEDstQv63yFICfnBBjRdkNIJbPnVWeLT47E52VM-Q'
                    }
                });
                setCast(response.data.cast);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    return (
        <div>
            <h2>Movie Cast</h2>
            <ul className={styles.actorsList}>
                {cast.map((actor, index) => (
                    <li key={index} className={styles.actor}>
                        <div className={styles.actorInfo}>
                        {actor.profile_path ? (
                            <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} className={styles.image} />
                            ) : (
                            <span className={styles.span}>No photo</span>
                            )}
                        {actor.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}