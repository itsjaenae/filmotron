import React from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieGrid.css';
const MovieGrid = ({ movies }) => {
    return (
        <div className="movies-grid mt-3">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie._id} />
            ))}
        </div>
    );
};

export default MovieGrid

