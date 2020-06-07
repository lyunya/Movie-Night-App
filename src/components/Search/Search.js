import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { URL_SEARCH, API_KEY, URL_POPULAR } from "../../movie-helpers";
import "./Search.css";
import MovieNightContext from "../../MovieNightContext";
import MovieListNav from "../MovieListNav/MovieListNav";
import Modal from '../AddMovieModal/AddMovieModal';
import Backdrop from '../AddMovieModal/Backdrop';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      movieIds: [],
      searchTerm: "",
      moviedata: [],
      AddMovieModal: false,
    };
  }

  static contextType = MovieNightContext;

  componentDidMount() {
    const popularURL = `${URL_POPULAR}${API_KEY}&language=en-US&page=1`;
    fetch(popularURL)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((responseJson) => {
        console.log(responseJson.results);
        let titles = responseJson.results.map((item) => item.title).join(", ");
        let movieIds = responseJson.results.map((item) => item.id);
        let moviedata = responseJson.results.map((item) => item);
        this.setState({
          moviesList: titles,
          movieIds,
          moviedata,
        });
      });
  }

  search = (e) => {
    e.preventDefault();
    const URL = `${URL_SEARCH}${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`;
    fetch(URL)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((responseJson) => {
        let titles = responseJson.results.map((item) => item.title).join(", ");
        let movieIds = responseJson.results.map((item) => item.id);
        let moviedata = responseJson.results.map((item) => item);
        this.setState({
          moviesList: titles,
          movieIds,
          moviedata,
        });
      });
  };

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  handleAddMovie = (movie) => {
    console.log("movie added", movie);
    this.setState({AddMovieModal: true})
  };

  modalAddMovieHandler = (movie) => {
    console.log(movie, 'this is the movie')
  }

  modalCancelHandler = () => {
    this.setState({ AddMovieModal: false });
  }

  render() {
    const { lists=[] } = this.context;
    return (
      <div className="movielist-wrapper">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <div className="sidebar">
                <MovieListNav
                  lists={this.props.lists}
                  handleAddList={this.props.handleAddList}
                />
              </div>
              <div className="search-content">
                <h1>Movie Night</h1>
                <p>
                  Create a Movie List on the left and
                  <br />
                  add movies you want to watch
                </p>
                <form onSubmit={this.search} className="search-form">
                  <input
                    placeholder="Search for movies"
                    onChange={this.handleChange}
                  />
                  <button type="submit">Search</button>
                </form>
                {this.state.AddMovieModal && <Backdrop />}
                {this.state.AddMovieModal && (
                  <Modal
                    canAddMovie
                    canCancel 
                    onAddMovie={this.modalAddMovieHandler()}
                    onCancel={this.modalCancelHandler}
                  >
                   <select id='movie-list-select' name='movie-list-id'>
                     {lists.map(list =>
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>)}
                      </select>
                  </Modal>
                )}
                {this.state.moviedata.map((movie) => {
                  return (
                    <div className="movieCard-search">
                      <MovieCard movieData={movie} key={movie.id} />
                      <button
                        className="addmovie-btn"
                        onClick={() => this.handleAddMovie({ movie })}
                      >
                        Add Movie to a List
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </MovieNightContext.Consumer>
      </div>
    );
  }
}
