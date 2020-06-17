import React from "react";
import { URL_IMAGE, URL_DEFAULT_IMAGE } from "../../movie-helpers";
import PropTypes from "prop-types";
import "./MovieCard.css";

export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: props.movieData,
    };
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
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.object,
};