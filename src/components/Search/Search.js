import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import { URL_SEARCH, API_KEY, URL_POPULAR } from "../../movie-helpers";
import "./Search.css";
import MovieNightContext from "../../MovieNightContext";
import MovieListNav from "../MovieListNav/MovieListNav"

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      movieIds: [],
      searchTerm: "",
      moviedata: [],
      hover: false
    };
  }

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
    console.log('movie added', movie);
  }

  toggleHover(){
    this.setState({
      hover: !this.state.hover
    })
  }

  render() {
    // let buttonHover;
    // if (this.state.hover){
    //   buttonHover = {display: 'inline-block'}
    //   console.log('hovered')
    // } else {
    //   buttonHover = {display: 'none'}
    //   console.log('not hovered')
    // }
    return (
      <div className="movielist-wrapper">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <nav className="App_nav">
                <MovieListNav
                  lists={this.props.lists}
                />
              </nav>
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
                {this.state.moviedata.map((movie) => {
                  return (
                    <div className="movieCard-search">
                      <MovieCard movieData={movie} key={movie.id} />
                      <button
                        className="addmovie-btn"
                        onClick={() => this.handleAddMovie({ movie })}
                      >
                        Add Movie to the List
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
