import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/MovieCard.scss';
import { Button } from 'react-bootstrap';
//utils
import { formatMovieImage } from '../utils/Movie';
import {Link} from 'react-router-dom'

const MovieCard = ({ movie }) => {
    const movieImage = formatMovieImage(movie.image.data, movie.image.contentType);
    const history = useHistory();
    const handleMoreInfo = () => {
        history.push(`/movies/${movie._id}`);
    };

    return (
        <div className="card-container">
            <img src={movieImage} alt="movie" />
            <div className="info w-100">
                <h2 className="m-0">{movie.title}</h2>
                <hr />
                <div className="mb-1">{`${movie.movieLength.hours}h ${movie.movieLength.minutes}m / ${movie.genre}`}</div>
                <div className="mb-3">{`Rating: ${
                    movie.avgRating ? parseFloat(movie.avgRating).toFixed(2) : 'N/A'
                }`}</div>
          
                <Button variant="primary" className="mr-2 card-color"onClick={handleMoreInfo}>
                    More Info
                </Button>

                <Link to={`${movie.trailerLink}`} >
                <Button variant="secondary" className=" card-colorTwo"   target="_blank">
                    Trailer
                </Button>
               </Link>
            </div>
        </div>
    );
};

export default MovieCard;
