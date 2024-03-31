import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './MovieReviews.module.css'

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams(); 

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTNkMDJlOTBjZDQzOTUzY2NhNzYwNTMzMjU0YTdiYyIsInN1YiI6IjY2MDg4ZTM4NTkwMDg2MDE3Y2I5YjcyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOpEDstQv63yFICfnBBjRdkNIJbPnVWeLT47E52VM-Q'
                    }
                });
                setReviews(response.data.results); 
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    return(
        <div>
            <h2>Movie Reviews</h2>
            {reviews.length > 0 ? (
            <ul className={styles.reviewsList}>
                {reviews.map((review, index) => (
                    <li key={index} className={styles.rewiew}>
                        <p className={styles.rewiewAuthor}>{review.author}</p>
                        <p className={styles.rewiewContent}>{review.content}</p>
                    </li>
                ))}
            </ul>
            ) : (
                <p>No reviews</p>
            )}
        </div>
    )
}