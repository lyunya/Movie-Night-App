import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import "./MovieList.css";
import MovieNightContext from "../../MovieNightContext";
import MovieListNav from "../MovieListNav/MovieListNav";
import Header from "../Header/Header";
import TokenService from "../../services/token-service";
import PropTypes from "prop-types";

export default class MovieList extends React.Component {
  static contextType = MovieNightContext;
  constructor(props) {
    super(props);
    this.state = {
      voted: null,
    }
  }

  registerVote = () => {
    this.setState({
      voted: 1
    })
  }

  render() {
    return (
      <div className="movielist-wrapper">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <Header />
              {TokenService.hasAuthToken() ? (
                <div className="sidebar">
                  <MovieListNav
                    lists={this.context.lists}
                    handleAddList={this.props.handleAddList}
                  />
                </div>
              ) : null}

              <div className="main-content">
                <div className="MovieList-heading">
                  <h1>Movie Night</h1>
                  <h2 className="selectedListHeading">
                    {context.currentListSelected.name}
                  </h2>
                  {TokenService.hasAuthToken() ? (
                    <Link
                      to={"/search"}
                      style={{ textDecoration: "none" }}
                      className="MovieListPageLink"
                    >
                      <button className="addmovielist-btn">
                        Search for Movies to Add
                      </button>
                    </Link>
                  ) : null}
                </div>
                {this.props.movies
                  .sort((a, b) => (a.votes > b.votes ? -1 : 1))
                  .map((movie) => {
                    return (
                      <div className="MovieList-cards" key={movie.id}>
                        <MovieCard movieData={movie} />
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

MovieList.propTypes = {
  movies: PropTypes.array,
  addVoteClick: PropTypes.func,
  handleAddList: PropTypes.func
};