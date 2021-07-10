import React, { useEffect } from 'react';
import { FaStar, FaSearch } from 'react-icons/fa';
import { Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
// components
import GenreFilter from '../../components/GenreFilter';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import MovieGrid from '../../components/MovieGrid';
import Pagination from '../../components/Pagination';
// api
import { getGenres } from '../../api/Genre';
import { getMovies } from '../../api/Movie';
// contexts
import {
    GENRES_ACTIONS,
    MOVIE_ACTIONS,
    RATING_ACTIONS,
    useMovieContext
} from '../../contexts/MoviesContext';

const Home = () => {
    const { state, dispatch } = useMovieContext();
    //Fetch Movies everytime searchQuery/genre/ratings changes
    useEffect(() => {
        dispatch({
            type: MOVIE_ACTIONS.MOVIES_FETCH_START
        });
        const fetchMovies = async (cancelToken) => {
            try {
                const res = await getMovies(
                    state.searchQuery,
                    state.currentGenre,
                    state.rating,
                    state.currentPage,
                    state.pageLimit,
                    cancelToken
                );
                const { movies, movieCount } = res.data;
                dispatch({
                    type: MOVIE_ACTIONS.MOVIES_FETCH_SUCCESS,
                    payload: { movies: movies, movieCount: movieCount }
                });
            } catch (err) {
                axios.isCancel(err) || dispatch({ type: MOVIE_ACTIONS.MOVIES_FETCH_FAILURE });
            }
        };

        const { cancel, token } = axios.CancelToken.source();
        const timeOutId = setTimeout(() => fetchMovies(token), 1000);
        //cancel last request and clear timeout before the next effect runs or when component unmounts
        return () => {
            cancel('Operation canceled.');
            clearTimeout(timeOutId);
        };
    }, [
        dispatch,
        state.searchQuery,
        state.currentGenre,
        state.rating,
        state.currentPage,
        state.pageLimit
    ]);

    //Fetch Genres
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await getGenres();
                dispatch({
                    type: GENRES_ACTIONS.GENRES_FETCH_SUCCESS,
                    payload: { genres: res.data.genres }
                });
            } catch {
                dispatch({
                    type: GENRES_ACTIONS.GENRES_FETCH_FAILURE
                });
            }
        };
        fetchGenres();
    }, [dispatch]);

    const handleSearchChange = (e) => {
        dispatch({
            type: MOVIE_ACTIONS.SET_SEARCH_QUERY,
            payload: {
                searchQuery: e.target.value
            }
        });
    };

    const handleRatingChange = (e) => {
        dispatch({
            type: RATING_ACTIONS.SET_RATING,
            payload: { rating: e.target.value || 0 }
        });
    };

    const setCurrentGenre = (genre) => {
        dispatch({
            type: GENRES_ACTIONS.SET_CURRENT_GENRE,
            payload: { genre: genre }
        });
    };

    return (
        <div className="p-5">
            <Alert variant="danger" show={state.hasError} transition={false}>
                <b>Error:</b> Movies or genres could not be loaded. Please try again at a later
                time.
            </Alert>
            <Row>
                <Col sm={12} lg={2}>
                    <h4 className="text-muted text-left">Filters</h4>
                    <GenreFilter
                        genres={state.genres}
                        currentGenre={state.currentGenre}
                        setCurrentGenre={setCurrentGenre}
                    />
                    <Input
                        onChange={handleRatingChange}
                        label="Rating"
                        Icon={FaStar}
                        type="number"
                        min={0}
                        max={10}
                        placeholder="0-10"
                        className="mt-3"
                    />
                </Col>
                <Col sm={12} lg={10}>
                    <Input
                        onChange={handleSearchChange}
                        Icon={FaSearch}
                        label="Search Movie"
                        placeholder="Search..."
                        className="mt-sm-3 mt-lg-0"
                    />
                    <p className="text-muted text-left mt-1">{state.movieCount} movies found</p>
                    {state.isLoadingMovies ? <Loader /> : <MovieGrid movies={state.movies} />}
                    <Pagination
                        movieCount={state.movieCount}
                        currentPage={state.currentPage}
                        limit={state.pageLimit}
                        setPage={(page) =>
                            dispatch({
                                type: MOVIE_ACTIONS.SET_CURRENT_PAGE,
                                payload: { page: page }
                            })
                        }
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
