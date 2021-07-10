import React, { useReducer, useContext } from 'react';

import {
    initialState,
    MOVIE_ACTIONS,
    GENRES_ACTIONS,
    RATING_ACTIONS,
    reducer
} from '../reducers/MoviesReducer';

const MovieContext = React.createContext();

const useMovieContext = () => {
    return useContext(MovieContext);
};

const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>;
};

export { MovieProvider, useMovieContext, MOVIE_ACTIONS, GENRES_ACTIONS, RATING_ACTIONS };
