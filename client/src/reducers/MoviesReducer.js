const MOVIE_ACTIONS = {
    SET_SEARCH_QUERY: 'set-search-query',
    MOVIES_FETCH_START: 'movies-fetch-start',
    MOVIES_FETCH_SUCCESS: 'movies-fetch-success',
    MOVIES_FETCH_FAILURE: 'movies-fetch-failure',
    SET_CURRENT_PAGE: 'set-current-page'
};

const GENRES_ACTIONS = {
    GENRES_FETCH_SUCCESS: 'genres-fetch-success',
    GENRES_FETCH_FAILURE: 'genres-fetch-failure',
    SET_CURRENT_GENRE: 'set-current-genre'
};

const RATING_ACTIONS = {
    SET_RATING: 'set-rating'
};

const reducer = (state, action) => {
    switch (action.type) {
        case MOVIE_ACTIONS.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload.searchQuery,
                currentPage: 1,
                movieCount: 0
            };
        case MOVIE_ACTIONS.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.page
            };
        case MOVIE_ACTIONS.MOVIES_FETCH_START:
            return {
                ...state,
                hasError: false,
                isLoadingMovies: true
            };
        case MOVIE_ACTIONS.MOVIES_FETCH_SUCCESS:
            return {
                ...state,
                movies: action.payload.movies,
                movieCount: action.payload.movieCount,
                isLoadingMovies: false
            };
        case MOVIE_ACTIONS.MOVIES_FETCH_FAILURE:
            return {
                ...state,
                hasError: true,
                isLoadingMovies: false
            };
        case GENRES_ACTIONS.SET_CURRENT_GENRE:
            return { ...state, currentGenre: action.payload.genre, currentPage: 1, movieCount: 0 };
        case GENRES_ACTIONS.GENRES_FETCH_SUCCESS:
            return { ...state, genres: action.payload.genres };
        case GENRES_ACTIONS.GENRES_FETCH_FAILURE:
            return { ...state, hasError: true };
        case RATING_ACTIONS.SET_RATING:
            return { ...state, rating: action.payload.rating, currentPage: 1, movieCount: 0 };
        default:
            return state;
    }
};

const initialState = {
    genres: [],
    currentGenre: 'All',
    rating: 0,
    searchQuery: '',
    movies: [],
    isLoadingMovies: true,
    hasError: false,
    currentPage: 1,
    pageLimit: 12,
    movieCount: 0
};

export { initialState, MOVIE_ACTIONS, GENRES_ACTIONS, RATING_ACTIONS, reducer };
