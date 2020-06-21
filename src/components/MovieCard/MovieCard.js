import React from "react";
import { URL_IMAGE, URL_DEFAULT_IMAGE } from "../../movie-helpers";
import PropTypes from "prop-types";
import MovieNightContext from "../../MovieNightContext";
import { toast } from "react-toastify";
import "./MovieCard.css";


export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: props.movieData,
      voted: null,
    };
  }

  static contextType = MovieNightContext;

    notify = () =>
    toast("already voted!", {
      autoClose: 1000,
      className: "toast-notification",
    });

  handleAddVote = (movieId) => {
    this.context.addVote(movieId);
    localStorage.setItem('vote', 1)
    const upvote = this.state.movieData.votes + 1;
    localStorage.getItem('vote') === 1 ? this.notify() :
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
                className="vote-btn"
                disabled={localStorage.getItem('vote')}
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
