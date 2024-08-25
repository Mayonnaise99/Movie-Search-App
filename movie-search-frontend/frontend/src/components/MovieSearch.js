import React, { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const searchMovies = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/api/search', {
                params: { query }
            });
            setMovies(response.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred while fetching data');
            }
            setMovies([]);
        }
    };
    // Function to extract month from the release date
    // const getMonthFromReleaseDate = (releaseDate) => {
    //     const date = new Date(releaseDate);
    //     const options = { month: 'long' }; // e.g., "August"
    //     return date.toLocaleString('en-US', options);
    // };

    // const getMonthFromReleaseDate = (releaseDate) => {
    //     try {
    //         const date = new Date(releaseDate);
    //         if (!isNaN(date)) {
    //             return date.toLocaleString('default', { month: 'long' });
    //         } else {
    //             return 'Unknown';
    //         }
    //     } catch {
    //         return 'Unknown';
    //     }
    // };

    return (
        <div className="movie-search">
            <h1>Movie Search</h1>
            <form onSubmit={searchMovies}>
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="movie-results">
                {movies.map(movie => (
                    <div key={movie.imdbID} className="movie-card">
                        <h2>{movie.Title}</h2>
                        <p>Release Year: {movie.Year}</p>
                        {/* <!--
                        <p>Release Month: {getMonthFromReleaseDate(movie.Released)}</p>
                        --> */}
                        <p><img src={movie.Poster} alt={`${movie.Title} poster`} /></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;
