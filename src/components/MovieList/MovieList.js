import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import "./MovieList.css";
import MovieNightContext from "../../MovieNightContext";
import MovieListNav from "../MovieListNav/MovieListNav";

export default class MovieList extends React.Component {
  static contextType = MovieNightContext;

  render() {
    return (
      <div className="movielist-wrapper">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <div className="sidebar">
                <MovieListNav
                  lists={this.context.lists}
                  handleAddList={this.props.handleAddList}
                />
              </div>

              <div className="main-content">
                <div className="MovieList-heading">
                  <h1>Movie Night</h1>
                  <h2 className="selectedListHeading">
                    {context.currentListSelected.name}
                  </h2>
                  <Link
                    to={"/search"}
                    style={{ textDecoration: "none" }}
                    className="MovieListPageLink"
                  >
                    <button className="addmovielist-btn">
                      Add Movie to List
                    </button>
                  </Link>
                </div>
                {this.props.movies.map((movie) => {
                  return (
                    <div className="MovieList-cards" key={movie.id}>
                      <MovieCard movieData={movie} />
                      <p>{`${movie.votes} votes`}</p>
                      <button
                        className="vote-btn"
                        onClick={() => this.props.addVoteClick(movie.id)}
                      >
                        Vote
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
