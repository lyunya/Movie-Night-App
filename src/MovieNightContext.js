import React from 'react';

const MovieNightContext = React.createContext({
    lists: [],
    movies: [],
    currentMovieSelected: {},
    currentListSelected: {},
    setCurrentListSelected: ()=>{},
    back: () => {},
})

export default MovieNightContext;