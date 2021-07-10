const MOVIE_REVIEW_ACTIONS = {
    SET_REVIEW: 'set-review',
    SET_RATING: 'set-rating',
    MOVIE_REVIEWS_FETCH_START: 'movies-reviews-fetch-start',
    MOVIE_REVIEWS_FETCH_SUCCESS: 'movies-reviews-fetch-success',
    MOVIE_REVIEWS_FETCH_FAILURE: 'movies-reviews-fetch-failure',
    OPEN_REVIEW_AUTH_ERROR: 'open-review-auth-error',
    USER_REVIEW_FETCH_START: 'user-review-fetch-start',
    USER_REVIEW_FETCH_SUCCESS: 'user-review-fetch-success',
    USER_REVIEW_FETCH_FAILURE: 'user-review-fetch-failure',
    USER_REVIEW_POST_START: 'user-review-post-start',
    USER_REVIEW_POST_SUCCESS: 'user-review-post-success',
    USER_REVIEW_POST_FAILURE: 'user-review-post-failure',
    CLOSE_INFO_MESSSAGE: 'close-info-message',
    CLOSE_ERROR_MESSAGE: 'close-error-message'
};

const reducer = (state, action) => {
    switch (action.type) {
        case MOVIE_REVIEW_ACTIONS.SET_REVIEW:
            return {
                ...state,
                review: action.payload.review
            };
        case MOVIE_REVIEW_ACTIONS.SET_RATING:
            return {
                ...state,
                rating: action.payload.rating
            };
        case MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_START:
            return {
                ...state,
                isLoadingMovieReviews: true
            };
        case MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_SUCCESS:
            return {
                ...state,
                isLoadingMovieReviews: false,
                movieReviews: action.payload.movieReviews
            };
        case MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_FAILURE:
            return {
                ...state,
                isLoadingMovieReviews: false,
                errorMsg:
                    'Movie reviews could no be loaded. Please refresh the page or try again later.',
                showError: true
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_START:
            return {
                ...state,
                isLoadingUserReview: true,
                userReviewExists: false
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_SUCCESS:
            return {
                ...state,
                isLoadingUserReview: false,
                review: action.payload.review,
                rating: action.payload.rating,
                userReviewExists: true
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_FAILURE:
            return {
                ...state,
                isLoadingUserReview: false,
                review: '',
                rating: null,
                userReviewExists: false
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_START:
            return {
                ...state,
                isSubmitting: true
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_SUCCESS:
            return {
                ...state,
                infoMsg: 'Review was successfully posted or updated.',
                showInfo: true,
                isSubmitting: false
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_FAILURE:
            return {
                ...state,
                errorMsg: 'Review could not be posted. Please try again at a later time.',
                showError: true,
                isSubmitting: false
            };
        case MOVIE_REVIEW_ACTIONS.OPEN_REVIEW_AUTH_ERROR:
            return {
                ...state,
                infoMsg: 'Must be signed in to add a review or rate the movie.',
                showInfo: true
            };
        case MOVIE_REVIEW_ACTIONS.CLOSE_INFO_MESSSAGE:
            return {
                ...state,
                infoMsg: null,
                showInfo: false
            };
        case MOVIE_REVIEW_ACTIONS.CLOSE_ERROR_MESSAGE:
            return {
                ...state,
                errorMsg: null,
                showError: false
            };
        default:
            return state;
    }
};

const initialState = {
    movieReviews: [],
    review: '',
    rating: null,
    userReviewExists: false,
    isLoadingUserReview: true,
    isLoadingMovieReviews: true,
    isSubmitting: false,
    showError: false,
    showInfo: false,
    errorMsg: '',
    infoMsg: ''
};

export { initialState, MOVIE_REVIEW_ACTIONS, reducer };
