import React from 'react';
import '../styles/MovieRating.css';
import { FaStar } from 'react-icons/fa';

const MovieRating = ({ rating, center, className }) => {
    return (
        <div
            className={`movie-rating ${
                center ? 'justify-content-center' : 'justify-content-start'
            } ${className}`}
        >
            <FaStar className="icon mr-1" />
            <span>{rating || 'N/A'}</span>
        </div>
    );
};

export default MovieRating;
