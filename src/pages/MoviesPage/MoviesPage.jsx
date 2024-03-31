import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css'

export default function MoviesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showInput, setShowInput] = useState(true);
    const location = useLocation();

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleInputVisibility = (visibility) => {
        setShowInput(visibility);
    };

    useEffect(() => {
        if (location.pathname !== '/movies') {
            setShowInput(false); 
            setSearchQuery('');
        }
    }, [location.pathname]);

    return (
        <div>
            {showInput && (
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search movies by title"
                    className={styles.input}
                />
            )}
            <MovieList
                searchQuery={searchQuery}
                url={`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US`}
                handleInputVisibility={handleInputVisibility} 
            />
            <Outlet />
        </div>
    );
}