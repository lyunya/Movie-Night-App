import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { URL_SEARCH, API_KEY, URL_POPULAR } from "../../movie-helpers";
import "./Search.css";
import MovieNightContext from "../../MovieNightContext";
import MovieListNav from "../MovieListNav/MovieListNav";
import Modal from "../AddMovieModal/AddMovieModal";
import Backdrop from "../AddMovieModal/Backdrop";
import { toast } from "react-toastify";
import config from "../../config";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      movieIds: [],
      searchTerm: "",
      movieData: [],
      movieToAdd: {},
      AddMovieModal: false,
      listSelected: "",
      canAddMovie: false,
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
        let titles = responseJson.results.map((item) => item.title).join(", ");
        let movieIds = responseJson.results.map((item) => item.id);
        let movieData = responseJson.results.map((item) => item);
        this.setState({
          moviesList: titles,
          movieIds,
          movieData,
        });
      });
  }
  onListSelect = (event) => {
    const movieWithListId = {
      ...this.state.movieToAdd,
      movielist_id: event.target.value,
    };
    this.setState({
      movieToAdd: movieWithListId,
      canAddMovie: true,
    });
  };
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
        let movieData = responseJson.results.map((item) => item);
        this.setState({
          moviesList: titles,
          movieIds,
          movieData,
        });
      });
  };

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  handleAddMovie = (movieObj) => {
    const movie = movieObj.movie;
    const movieDetailsObj = {
      title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      votes: 0,
    };
    this.setState({
      AddMovieModal: true,
      movieToAdd: movieDetailsObj,
    });
  };

  modalAddMovieHandler = () => {
    const newMovie = this.state.movieToAdd;
    this.context.addMovie(newMovie);

    fetch(`${config.API_ENDPOINT}/movies`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.log(`Error is: ${err}`);
            throw err;
          });
        }
        return res.json();
      })
      .then((data) => {
        this.context.addMovie(data);
      })
      .catch((err) => {
        this.setState({ err });
      });
    this.setState({ AddMovieModal: false, canAddMovie: false });
    this.notify();
  };

  modalCancelHandler = () => {
    this.setState({ AddMovieModal: false, canAddMovie: false });
  };

  notify = () =>
    toast("movie added!", { autoClose: 1500, className: "toast-notification" });

  render() {
    const { lists = [] } = this.context;
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
                    canAddMovie={this.state.canAddMovie}
                    onAddMovie={this.modalAddMovieHandler}
                    onCancel={this.modalCancelHandler}
                  >
                    <select
                      className="movie-list-select"
                      name="movie-list-id"
                      onChange={this.onListSelect}
                    >
                      <option value="" disabled selected>
                        Select your movie list
                      </option>
                      {lists.map((list) => (
                        <option
                          key={list.id}
                          value={list.id}
                          className="list-options"
                        >
                          {list.list_name}
                        </option>
                      ))}
                    </select>
                  </Modal>
                )}
                <h3>Popular Movies</h3>
                {this.state.movieData.map((movie) => {
                  return (
                    <div className="movieCard-search" key={movie.id}>
                      <MovieCard movieData={movie} />
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
