import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import { URL_SEARCH, API_KEY, URL_POPULAR } from "../../movie-helpers";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      movieIds: [],
      searchTerm: "",
      moviedata: [],
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

  render() {
    return (
      <div className="movielist-wrapper">
        <Link
          to={"/"}
          style={{ textDecoration: "none" }}
          className="MovieListPageLink"
        >
          <h1>Movie Night</h1>
        </Link>
        <form onSubmit={this.search} className="search-form">
          <input placeholder="Search for movies" onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        {this.state.moviedata.map((movie) => {
          return <MovieCard movieData={movie} key={movie.id} />;
        })}
      </div>
    );
  }
}
