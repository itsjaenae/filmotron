import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Alert, Row, Col, Image, Container } from 'react-bootstrap';
import '../../../styles/MovieInfo.css';
import {Link} from "react-router-dom"
//context
import { useAuthContext } from '../../../contexts/AuthContext';
import {
    useMovieInfoContext,
    MOVIE_INFO_ACTIONS,
    ADMIN_ACTIONS
} from '../../../contexts/MovieInfoContext';
//api
import { getMovieById, deleteMovieById } from '../../../api/Movie';
//utils
import { formatMovieImage } from '../../../utils/Movie';
//components
import Loader from '../../../components/Loader';
import MovieRating from '../../../components/MovieRating';
import Modal from '../../../components/Modal';

const MovieInfoById = () => {
    //router
    let { id: movieId } = useParams();
    const history = useHistory();
    //context
    const { isAdmin } = useAuthContext();
    const { state, dispatch } = useMovieInfoContext();
    const { movie } = state;
    useEffect(() => {
        const fetchMovie = async () => {
            dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_FETCH_START });
            try {
                const res = await getMovieById(movieId);
                let movieData = res.data.movie;
                //get image url and parse average rating to float
                movieData = {
                    ...movieData,
                    image: formatMovieImage(movieData.image.data, movieData.image.contentType),
                    avgRating: movieData.avgRating
                        ? parseFloat(movieData.avgRating).toFixed(2)
                        : null
                };
                dispatch({
                    type: MOVIE_INFO_ACTIONS.MOVIE_FETCH_SUCCESS,
                    payload: { movie: movieData }
                });
            } catch {
                dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_FETCH_FAILURE });
            }
        };
        fetchMovie();
    }, [movieId, dispatch]);

    const handleEditMovie = () => {
        if (isAdmin) {
            dispatch({ type: ADMIN_ACTIONS.MOVIE_EDIT_START });
        } else {
            dispatch({ type: ADMIN_ACTIONS.OPEN_ADMIN_ERROR });
        }
    };

    const handleDeleteMovie = () => {
        if (isAdmin) {
            dispatch({ type: ADMIN_ACTIONS.MOVIE_DELETE_START });
        } else {
            dispatch({ type: ADMIN_ACTIONS.OPEN_ADMIN_ERROR });
        }
    };

    const deleteMovie = async () => {
        try {
            const res = await deleteMovieById(movieId);
            if (res.status === 204) {
                dispatch({ type: ADMIN_ACTIONS.MOVIE_DELETE_END });
                history.push('/');
            }
        } catch {
            dispatch({ type: ADMIN_ACTIONS.MOVIE_DELETE_FAILURE });
            dispatch({ type: ADMIN_ACTIONS.MOVIE_DELETE_END });
        }
    };
    return (
        <Container className="p-3 my-3 movie-container">
            <Alert variant="danger" show={state.showError} transition={false}>
                {state.errorMsg}
            </Alert>
            <Modal
                show={state.showModal}
                header={'Error'}
                message={state.modalMsg}
                onHide={() => dispatch({ type: ADMIN_ACTIONS.CLOSE_ADMIN_ERROR })}
            />
            <Modal
                show={state.showDeleteModal}
                header={'Delete Confirmation'}
                message={'Are you sure you want to delete this movie?'}
                onHide={() => dispatch({ type: ADMIN_ACTIONS.MOVIE_DELETE_END })}
                onConfirm={() => deleteMovie()}
            />
            {state.isLoadingMovie ? <h1>Loading Movie...</h1> : null}

            {state.isLoadingMovie ? (
                <Loader />
            ) : movie ? (
                <Row>
                    <Col sm={12} xl={3} className="text-center mb-4 mb-xl-0  ">
                        <div className="d-block  d-xl-none text-center text-xl-left mb-4">
                            <h1 className="movie-title">{movie.title}</h1>
                            <div className="subtext">
                               {movie.genre}
                                <span className="ghost">|</span>
                                <time className="movie-genre">
                                    {movie.movieLength.hours +
                                        'h ' +
                                        movie.movieLength.minutes +
                                        'm'}
                                </time>
                               
                                <MovieRating
                                    rating={movie.avgRating}
                                    center={true}
                                    className="mt-1 rating"
                                />
                           </div>
                           </div>
                        <Image fluid src={movie.image} alt="movie" className="movie-info-image movie-image " />
                      
                        <div className="mt-1 ">
                 
                            <Button variant="primary" className="mr-3 movie-button " onClick={handleEditMovie}>
                                Edit Movie
                            </Button>
                        
                         
                            <Button variant="danger" className="movie-button" onClick={handleDeleteMovie}>
                                Delete Movie
                            </Button>
                        
                        </div>
                    </Col>
                    <Col sm={12} xl={9}>
                        <div className="d-none  d-xl-block text-center text-xl-left mb-4">
                            <h1 className="movie-title" >{movie.title}</h1>
                            <div className="subtext">
                                {movie.genre}
                                <span className="ghost">|</span>
                                <time>
                                    {movie.movieLength.hours +
                                        'h ' +
                                        movie.movieLength.minutes +
                                        'm'}
                                </time>  
                                <MovieRating className="rating"
                                rating={movie.avgRating} center={false} />
                          </div>
                        </div>
                        <div className="description">
                            <p>{movie.description}</p>
                            <p>
                                Watch the trailer{' '}
                                <Link to={movie.trailerLink} target="_blank" rel="noreferrer" className="movie-link">
                                    {' '}
                                    here
                                </Link>
                                .
                            </p>
                        </div>
                    </Col>
                </Row>
            ) : null}
        </Container>
    );
};

export default MovieInfoById;
