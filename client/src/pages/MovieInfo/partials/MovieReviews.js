import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Container } from 'react-bootstrap';
import '../../../styles/MovieInfo.css';
//import { MdRateReview } from 'react-icons/md';
import * as yup from 'yup';
//api
import { getMovieReviews, addReview } from '../../../api/Review';
import { getMovieAverageById } from '../../../api/Movie';
//contexts
import { useAuthContext } from '../../../contexts/AuthContext';
import { MOVIE_INFO_ACTIONS, useMovieInfoContext } from '../../../contexts/MovieInfoContext';
//components
import Loader from '../../../components/Loader';
import TextArea from '../../../components/TextArea';
import UserRating from '../../../components/UserRating';
import UserReviews from '../../../components/UserReviews';
//reducer
import { initialState, MOVIE_REVIEW_ACTIONS, reducer } from '../../../reducers/MovieReviewReducer';



let reviewSchema = yup.object().shape({
    review: yup.string().required('A review is required.').min(1),
    rating: yup.number().required('A rating is required.')
});

const MovieReviews = () => {
    const [reviewState, reviewDispatch] = useReducer(reducer, initialState);
    const { isAuth, currentUserId } = useAuthContext();
    const { state: movieInfoState, dispatch: movieInfoDispatch } = useMovieInfoContext();
    const { isLoadingMovie, fetchMovieFailure } = movieInfoState;
    let { id: movieId } = useParams();
    const [hasReviewSchemaError, setHasReviewSchemaError] = useState(false);

    //used to refetech rating and reviews after submitting review
    const fetchData = useCallback(async () => {
        //fetch movie reviews
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_START
        });
        reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_START });
        const movieReviewsRes = await getMovieReviews(movieId);
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_SUCCESS,
            payload: { movieReviews: movieReviewsRes.data.movieReviews }
        });

        //fetch movie avg rating
        const avgRatingRes = await getMovieAverageById(movieId);
        movieInfoDispatch({
            type: MOVIE_INFO_ACTIONS.UPDATE_AVERAGE_RATING,
            payload: {
                avgRating: avgRatingRes.data.avgRating
                    ? parseFloat(avgRatingRes.data.avgRating).toFixed(2)
                    : null
            }
        });
        //find current user review
        const currentUserReview = movieReviewsRes.data.movieReviews.find((userReview) => {
            return userReview.user._id === currentUserId;
        });
        if (currentUserReview) {
            reviewDispatch({
                type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_SUCCESS,
                payload: {
                    review: currentUserReview.review,
                    rating: currentUserReview.rating
                }
            });
        } else {
            reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_FAILURE });
        }
    }, [movieId, movieInfoDispatch, currentUserId]);

    //movie reviews
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleReview = (e) => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.SET_REVIEW,
            payload: { review: e.target.value }
        });
    };

    const handleRating = (e) => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.SET_RATING,
            payload: { rating: e.target.value }
        });
    };

    const handleSubmit = async () => {
        if (isAuth) {
            try {
                const valid = await reviewSchema.isValid({
                    rating: reviewState.rating,
                    review: reviewState.review.trim()
                });
                if (valid) {
                    setHasReviewSchemaError(false);
                    reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_START });
                    const res = await addReview(movieId, reviewState.rating, reviewState.review);
                    if (res.status === 201) {
                        reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_SUCCESS });
                        await fetchData();
                    }
                } else {
                    setHasReviewSchemaError(true);
                }
            } catch {
                reviewDispatch({
                    type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_FAILURE
                });
            }
        } else {
            reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.OPEN_REVIEW_AUTH_ERROR });
        }
    };

    //alert handlers
    const closeErrorAlert = () => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.CLOSE_ERROR_MESSAGE
        });
    };
    const closeInfoAlert = () => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.CLOSE_INFO_MESSSAGE
        });
    };

    return (
        <>
            {!isLoadingMovie && !fetchMovieFailure ? (
                <Container className="p-3 min-vh-100 review">
                    <h1 className="text-center">Reviews</h1>
                    <div className="user-review-container mt-4">
                        <Alert
                            variant="danger"
                            show={reviewState.showError}
                            onClose={closeErrorAlert}
                            transition={false}
                        >
                            {reviewState.showError}
                        </Alert>
                        <Alert
                            variant="info"
                            dismissible
                            onClose={closeInfoAlert}
                            show={reviewState.showInfo}
                            transition={false}
                        >
                            {reviewState.infoMsg}
                        </Alert>
                        <UserRating rating={reviewState.rating} handleRating={handleRating} />
                        <TextArea
                            name="review"
                            type="text"
                            min={0}
                            rows={2}
                            onChange={handleReview}
                            value={reviewState.review}
                            // Icon={MdRateReview}
                            placeholder="Add a public review..."
                            className="mb-1"
                            error={
                                hasReviewSchemaError ? 'A rating and a review are required.' : null
                            }
                        />
                        <div className="d-flex justify-content-end">
                           
                            <Button className="review-button"
                                variant="danger"
                                onClick={handleSubmit}
                                disabled={
                                    reviewState.isSubmitting || reviewState.isLoadingMovieReviews
                                }
                            >
                                {reviewState.userReviewExists ? 'Update review' : 'Post'}
                            </Button>
                        </div>
                    </div>
                    <div className="mt-3">
                        {reviewState.isLoadingMovieReviews ? (
                            <Loader />
                        ) : (
                            <UserReviews reviews={reviewState.movieReviews} />
                        )}
                    </div>
                </Container>
            ) : null}
        </>
    );
};

export default MovieReviews;
