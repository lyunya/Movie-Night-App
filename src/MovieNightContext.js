import React from 'react';

const MovieNightContext = React.createContext({
    lists: [],
    movies: [],
    currentMovieSelected: {},
    currentListSelected: {},
    setCurrentListSelected: ()=>{},
    back: () => {},
    addMovie: () => {},
    deleteList: () => {},
    setLists: () => {},
    setMovies: () => {},
})

export default MovieNightContext;