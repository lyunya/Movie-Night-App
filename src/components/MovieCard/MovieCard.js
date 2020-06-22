import React from "react";
import { URL_IMAGE, URL_DEFAULT_IMAGE } from "../../movie-helpers";
import PropTypes from "prop-types";
import MovieNightContext from "../../MovieNightContext";
import "./MovieCard.css";


export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: props.movieData,
    };
  }

  static contextType = MovieNightContext;



  handleAddVote = (movieId) => {
    this.context.addVote(movieId);
    localStorage.setItem(
      `${this.state.movieData.movielist_id} vote`,
       this.state.movieData.movielist_id
    );
    const upvote = this.state.movieData.votes + 1;
    this.setState({
      movieData: {...this.state.movieData, votes: upvote}
    })
  }

  render() {
    //if API doesn't have movie poster, use default image
    const withImage = this.state.movieData.poster_path
      ? URL_IMAGE + this.state.movieData.poster_path
      : URL_DEFAULT_IMAGE;

    return (
      <div className="moviecard">
        <img alt={`movie poster`} src={withImage} className="movieposter" />
        <div className="movietext">
          <h2 className="movietitle">{this.state.movieData.title}</h2>
          <p className="movieoverview">{this.state.movieData.overview}</p>
          {this.state.movieData.votes >= 0 ? (
            <>
              <p>{`${this.state.movieData.votes} votes`}</p>
              <button
                className={"vote-btn"}
                disabled={
                  JSON.parse(
                    localStorage.getItem(
                      `${this.state.movieData.movielist_id} vote`
                    )
                  ) === this.state.movieData.movielist_id
                }
                onClick={() => this.handleAddVote(this.state.movieData.id)}
              >
                Vote
              </button>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.object,
};
