import Poster_Missing from './images/no_poster.jpg'

export const URL_DETAIL = "https://api.themoviedb.org/3/movie/";
export const URL_SEARCH = "https://api.themoviedb.org/3/search/movie";
export const URL_POPULAR = "https://api.themoviedb.org/3/movie/popular";
export const URL_IMAGE = "https://image.tmdb.org/t/p/w500";
export const API_KEY = "9ae4ea7110e8975c97d2c51ccc77ff3c";
export const URL_DEFAULT_IMAGE = Poster_Missing;

export const getMoviesForList = (movies, movielist_id) => {
  return movies.filter((movie) => movie.movielist_id === movielist_id);
};

