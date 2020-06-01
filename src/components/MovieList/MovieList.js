import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import "./MovieList.css";
import MovieNightContext from "../../MovieNightContext";
import { URL_SEARCH, URL_POPULAR, API_KEY } from "../../movie-helpers";

export default class MovieList extends React.Component {
  static contextType = MovieNightContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (movieId) => {
    console.log("vote clicked");
    console.log("this is movieID", movieId);
  };

  render() {
    console.log(this.props);
    return (
      <div className="movielist-wrapper">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <Link
                to={"/"}
                style={{ textDecoration: "none" }}
                className="MovieListPageLink"
              >
                <button className="addmovie-btn">Add Movie to List</button>
              </Link>
              <h2>{context.currentListSelected.name}</h2>
              {this.props.movies.map((movie) => {
                return (
                  <div>
                    <MovieCard movieData={movie} key={movie.id} />
                    <button onClick={() => this.handleClick(movie.id)}>
                      Vote
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </MovieNightContext.Consumer>
      </div>
    );
  }
}
