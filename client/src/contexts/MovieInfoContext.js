import React, { useReducer, useContext } from 'react';

import {
    MOVIE_INFO_ACTIONS,
    ADMIN_ACTIONS,
    initialState,
    reducer
} from '../reducers/MovieInfoReducer';

const MovieInfoContext = React.createContext();

const useMovieInfoContext = () => {
    return useContext(MovieInfoContext);
};

const MovieInfoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MovieInfoContext.Provider value={{ state, dispatch }}>
            {children}
        </MovieInfoContext.Provider>
    );
};

export { MovieInfoProvider, useMovieInfoContext, MOVIE_INFO_ACTIONS, ADMIN_ACTIONS };
