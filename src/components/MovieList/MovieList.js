import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import "./MovieList.css";
import MovieNightContext from "../../MovieNightContext";
import MovieListNav from '../MovieListNav/MovieListNav'

export default class MovieList extends React.Component {
  static contextType = MovieNightContext;
  constructor(props) {
    super(props);
    this.state = {
      movieData: props.movieData,
    };
  }

  handleVoteClick = (movie) => {
    console.log("vote clicked");
    console.log(this.props, 'this.props')
    console.log("# of votes", movie.votes = movie.votes + 1);
    this.setState({
      movieData: movie
    })
  };

  render() {

    return (
      <div className="movielist-wrapper">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <nav className="App_nav">
                <MovieListNav
                  lists={this.props.lists}
                  handleAddList={this.props.handleAddList}
                />
              </nav>
              <div className="MovieList-heading">
                <h2>{context.currentListSelected.name}</h2>
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
                  <div className="MovieList-cards">
                    <MovieCard movieData={movie} key={movie.id} />
                    <button
                      className="votemovie-btn"
                      onClick={() => this.handleVoteClick(movie)}
                    >
                      Vote
                    </button>
                    <p>{`${this.state.votes} votes`}</p>
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
