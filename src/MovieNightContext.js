import React from 'react';

const MovieNightContext = React.createContext({
    lists: [],
    movies: [],
    votes: 0,
    currentMovieSelected: {},
    currentListSelected: {},
    setCurrentListSelected: ()=>{},
    back: () => {},
    addMovie: () => {}
})

export default MovieNightContext;