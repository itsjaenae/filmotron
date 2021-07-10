// import axios from '../axios';
import axios from 'axios';
import { toTitleCase } from '../utils/String';

export const getMovieById = (movieId) => {
    return axios.get(`/api/movies/${movieId}`);
};

export const addMovie = (movie) => {
    const contentType = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('title', toTitleCase(movie.title));
    formData.append('genre', toTitleCase(movie.genre));
    formData.append('trailerLink', movie.trailerLink);
    formData.append('hours', movie.hours);
    formData.append('minutes', movie.minutes);
    formData.append('description', movie.description);
    formData.append('image', movie.image);
    return axios.post('/api/movies/new', formData, contentType);
};

export const getMovies = (searchQuery, genre, rating, page, limit, cancelToken) => {
    const query = {
        searchQuery: toTitleCase(searchQuery),
        genre: toTitleCase(genre),
        page,
        limit,
        rating
    };
    return axios.get(
        '/api/movies',
        {
            params: query
        },
        { cancelToken }
    );
};

export const deleteMovieById = (movieId) => {
    return axios.delete(`/api/movies/${movieId}`, { withCredentials: true });
};

export const getMovieAverageById = (movieId) => {
    return axios.get(`/api/movies/rating/${movieId}`);
};

export const updateMovie = (movie, movieId, prevGenre) => {
    const contentType = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('title', toTitleCase(movie.title));
    formData.append('genre', toTitleCase(movie.genre));
    formData.append('prevGenre', toTitleCase(prevGenre));
    formData.append('trailerLink', movie.trailerLink);
    formData.append('hours', movie.hours);
    formData.append('minutes', movie.minutes);
    formData.append('description', movie.description);
    formData.append('image', movie.image);
    return axios.put(`/api/movies/${movieId}`, formData, contentType);
};
